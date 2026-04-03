import { TabIndexManager, TemplateNode } from 'uc-runtime/core.js';
import { RecycleView$Designer } from './designerFiles/RecycleView.uc.designer.js';
import { SimpleViewManage } from './RecycleView.uc.manage.js';
import { SimpleViewNavigate } from './RecycleView.uc.nav.js';
class IDynamicSource<K = any> {
    length = 0;
    get: (index: number) => Promise<K>;
}
export class RecycleViewState {
    currentIndex: number = -1;
    topIndex: number = 0;
    bottomIndex: number = 0;
    allowSetAttrib: boolean = true;
}
export class RecycleView extends RecycleView$Designer {
    private _templateNode: TemplateNode;
    public get templateNode(): TemplateNode {
        return this._templateNode;
    }
    public set templateNode(value: TemplateNode) {
        this._templateNode = value;
        this.MapTemplate = (row, index) => this.templateNode;

    }
    MapTemplate: (row: any, index: number) => TemplateNode;

    private _currentItem: bondModel;
    public get currentItem(): bondModel {
        let rtrn = this._currentItem;
        return rtrn;
    }

    public set currentItem(value: bondModel) {
        this._currentItem = value;
        this.states.currentIndex = value?.index ?? -1;
    }
    ArrangingContents = false;
    states = new RecycleViewState();
    manage: SimpleViewManage;
    navigate: SimpleViewNavigate;

    private isDynamicSource = false;
    private _staticSource: any[] = [];
    length: number = 0;

    private _dynamicSource: IDynamicSource;
    public get source(): any[] {
        return this._staticSource;
    }
    MinimumLength = 1;
    public set source(value: any[]) {
        this.isDynamicSource = Object.getPrototypeOf(value).constructor.name != 'Array';
        if (!this.isDynamicSource) {
            this._staticSource = value;
            this.length = value.length;
        } else {
            this._dynamicSource = value as unknown as IDynamicSource;
        }
        this.manage.initRows();
    }
    provideElement = <K>(row: K, index: number) => {
        return this.MapTemplate(row, index).extended.generateNode(row);
    }
    refresh = async (resetPos: boolean = true) => {
        if (resetPos) {
            this.states.currentIndex = 0;
            this.states.topIndex = 0;
        }
        await this.visibleCurrent();

    }
    async $() {
        this.manage = new SimpleViewManage(this);
        this.navigate = new SimpleViewNavigate(this);
        this.topIndicator.style.display =
            this.bottomIndicator.style.display = 'block';
        this.manage.changeHiddenCount(0, 0);
        let _this = this;
        requestAnimationFrame(() => {
            if (_this.currentIndex == undefined)
                _this.currentIndex = this.states.currentIndex ?? 0;
        });
    }
    set currentIndex(i: number) {
        this.manage.setCurrentIndex(i);
    }
    visibleCurrent = async () => {
        this.manage.reFill();
    }
    get currentIndex() {
        return this.currentItem?.index;
    }
    __END_OF_LIST = {
        exitSingle: async (drow: any, e: Event) => {
            if (e != undefined) e.stopPropagation();
            const _this = this;
            if (_this.source.length > _this.MinimumLength) {
                if (drow != undefined) {
                    let bnd = bondModel.Parse(drow);
                    const cidx = bnd.index;
                    _this.source.splice(bnd.index, 1);
                    _this.source = this.source;
                    await _this.refresh();
                    const itm = _this.source[cidx];
                    if (itm != undefined)
                        await TabIndexManager.moveNext(bondModel.Parse(itm).element, e as any, false);
                    else {
                        await TabIndexManager.moveNext(_this.viewport, e as any, true);
                        _this.currentItem = undefined;
                    }
                    TabIndexManager.stopFurther(e, true);
                }
                return true;
            } else { return false; }
        }
    }
}

export class bondModel<K = any> {

    constructor() { setUnIteratableProp(this, bondModel.ACCESS_KEY, this); }
    extra: Record<string, any> = {

    };
    static ACCESS_KEY = '__@bondModel';
    static Parse<K>(row: K) {
        if (row == undefined) return undefined;
        let bx = row[this.ACCESS_KEY] as bondModel<K>;
        if (bx == undefined) {
            bx = new bondModel();
            bx.row = row;
            row[this.ACCESS_KEY] = bx;
            setUnIteratableProp(row, this.ACCESS_KEY, bx);
        }
        return bx;
    }
    remove() {
        this.element?.remove();
        this.element = undefined;
        this.hasMeasured = false;
    }
    get isGenerated() { return this.element != undefined; }
    hasMeasured = false;
    isSelectable = true;
    private _element: HTMLElement;
    public get element(): HTMLElement {
        return this._element;
    }
    public set element(value: HTMLElement) {
        this._element = value;
        if (value != undefined)
            value[bondModel.ACCESS_KEY] = this;
        this.hasMeasured = false;
    }
    measure() {
        let c = this.element.getBoundingClientRect();
        this.height = c.height; //this.element.offsetHeight; // ; 
        this.hasMeasured = this.element.isConnected;
    }
    index: number = undefined;
    get isConnected() { return this.element?.isConnected; }
    height: number;
    row: K;
}
function setUnIteratableProp<K = any>(obj: K, prop: keyof K | string, value: any) {
    Object.defineProperty(obj, prop, {
        value: value,
        enumerable: false, // Makes the property uniterable
        writable: true,    // Optional: Allows modifying the value
        configurable: true, // Optional: Allows redefinition or deletion

    });
}