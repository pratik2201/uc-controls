import { CommonEvent, KeyboardKey, TabIndexManager, TemplateNode } from 'uc-runtime/core.js';
import { RecycleView$Designer } from './designerFiles/RecycleView.uc.designer.js';
 

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

    private _source: any[] = [];
    length: number = 0;

    public get source(): any[] {
        return this._source;
    }
    MinimumLength = 1;
    public set source(value: any[]) {
        this._source = value;
        this.length = value.length;
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

class Size {
    width = 0;
    height = 0;
}
export class SimpleViewManage {
    main: RecycleView;
    rectObs: ResizeObserver;
    get source() { return this.main.source; }
    constructor(main: RecycleView) {
        this.main = main;
        let _this = this;
    }
    getBond(indx: number) {
        return bondModel.Parse(this.main.source[indx]);
    }

    viewSize = new Size();
    private _paging = false;
    public get paging() {
        return this._paging;
    }
    private oldSize: Size;
    public set paging(value) {
        this._paging = value;
        let main = this.main;
        if (!value) {
            this.oldSize = Object.assign(new Size(), this.viewSize);
            this.viewSize.width = this.viewSize.height = Number.MAX_SAFE_INTEGER;
            main.topIndicator.style.display =
                main.bottomIndicator.style.display = 'none';
        } else {
            // console.log('ON');
            main.topIndicator.style.display =
                main.bottomIndicator.style.display = 'block';
            if (this.oldSize != undefined)
                Object.assign(this.viewSize, this.oldSize);
            //this.rectObs.observe(main.scroller1);
        }
    }
    static FrectionSize = 16;
    private isFirstCall_updateSize = true;
    updateSize = () => {
        if (this.isFirstCall_updateSize) { this.isFirstCall_updateSize = false; return; }
        if (this.paging)
            this.viewSize.height = Math.floor(this.main.rowContainer.offsetHeight / SimpleViewManage.FrectionSize) * SimpleViewManage.FrectionSize;

    }

    setCurrentIndex(value: number) {
        const _main = this.main;

        if (value == undefined || !_main.ucExtends.self.isConnected) { /*debugger; */ return; }
        let states = _main.states;
        let slen = _main.source.length;
        if (slen == 0 || value < 0 || value >= slen) return;
        let cItem = _main.currentItem;
        let prevIndex = 0;
        let isPreviousUndefined = (cItem == undefined);
        if (!isPreviousUndefined) {
            prevIndex = cItem.index;
            if (states.allowSetAttrib && cItem.isGenerated) cItem.element.setAttribute('aria-current', `false`);
        }
        let rObj = bondModel.Parse(_main.source[value]); //src.getRow(value);
        if (!rObj.isSelectable) {
            if (rObj.index >= slen - 1) {
                _main.currentItem = undefined;
                if (states.allowSetAttrib)
                    cItem?.element.setAttribute('aria-current', `false`);
                return;
            }
            _main.currentItem = rObj;
            if (prevIndex > value) { //  IF TOP SIDE SELECTED
                this.main.navigate.movePrev(undefined as KeyboardEvent);
            } else {      //  IF BOTTOM SIDE SELECTED

                this.main.navigate.moveNext(undefined as KeyboardEvent);
            }
            if (_main.currentItem.index != value) return;
            else {
                rObj = bondModel.Parse(_main.source[prevIndex]);//src.getRow(prevIndex);
            }
        }
        cItem = _main.currentItem = rObj;

        if (states.allowSetAttrib) {
            if (cItem.isGenerated)
                cItem.element?.setAttribute('aria-current', 'true');
            else {
                this.makeAlive(cItem, _main.rowContainer.lastElementChild);
                cItem.element?.setAttribute('aria-current', 'true');
                cItem.element.remove();
            }
        }
        // cItem.element.focus();
    }
    initRows() {
        const src = this.main.source;
        const allowStates = this.main.states.allowSetAttrib;
        for (let i = 0, ilen = src.length; i < ilen; i++) {
            const bnd = bondModel.Parse(src[i]);
            bnd.index = i;
            if (bnd.isGenerated) {
                bnd.element.setAttribute('x-tabindex', '' + bnd.index);
                if (allowStates)
                    bnd.element.setAttribute('aria-current', (this.main.currentItem == bnd) ? 'true' : 'false');
            }
        }
    }
    Events = {
        justBeforeGenerateElement: (e: bondModel) => { },
    }
    makeAlive(e: bondModel, _after?: Element) {
        if (e == undefined) { debugger; return; }
        let main = this.main;
        let _this = this;
        // let e = bondModel.Parse(main.source[i]);
        if (!e.isGenerated) {
            //_this.Events.justBeforeGenerateElement(e);
            e.element = main.provideElement(e.row, e.index);
            e.hasMeasured = false;
        }
        if (!e.isConnected) {
            if (_after != undefined) _after.after(e.element)
            else this.main.rowContainer.prepend(e.element);
        }
        if (!e.hasMeasured)
            e.measure();
        return e;
    }
    reFill(startIndex = this.main.states.topIndex, bottomToTop = false) {
        const cntnr = this.main.rowContainer;
        //console.log('scroll', [this.main.begin_scroll_text.offsetHeight, this.main.end_scroll_text.offsetHeight]);

        //console.log([this.main.scroller1.offsetHeight,this.viewSize.height]);

        this.updateSize();
        cntnr.innerHTML = '';
        if (this.main.length == 0) return;
        let h = 0;
        const _this = this;
        let vh = this.viewSize.height;
        if (_this.paging) {
            const crect = _this.main.viewport.getClientRects();
            if (crect.length > 0)
                vh = crect[0].height;
            //else vh = Number.MAX_SAFE_INTEGER;
        } else {
            vh = Number.MAX_SAFE_INTEGER;//vh == 0 ? _this.main.scroller1.getClientRects()[0].height : vh;
        }
        this.viewSize.height = vh;
        function btot(sf: number) {
            if (sf <= 0) return;

            for (let i = sf; ; i--) {
                let e = _this.makeAlive(_this.getBond(i), undefined);
                h += e.height;
                if (h > vh) { if (cntnr.children.length > 1) cntnr.firstElementChild.remove(); break; }
                else {
                    if (i <= 0) {
                        ttob(sf + 1);
                        break;
                    }
                }
            }
        }
        function ttob(sf: number) {
            for (let i = sf; ; i++) {
                let e = _this.makeAlive(_this.getBond(i), cntnr.lastElementChild as any);
                h += e.height;
                if (h > vh) { if (cntnr.children.length > 1) cntnr.lastElementChild.remove(); break; }
                else {
                    if (i >= _this.main.length - 1) {
                        btot(sf - 1);
                        break;
                    }
                }
            }
        }
        if (!bottomToTop) {
            this.main.states.topIndex = startIndex;
            ttob(startIndex);
        } else {
            btot(startIndex);
        }
        this.main.states.topIndex = this.main.navigate.topBond.index;
        this.updateHiddenCount();
    }
    updateHiddenCount() {
        let top = bondModel.Parse(this.main.rowContainer.firstChild);
        let bottom = bondModel.Parse(this.main.rowContainer.lastChild);
        this.changeHiddenCount(top.index, (this.main.length - 1) - bottom.index);
    }
    changeHiddenCount = (topCount: number, bottomCount: number) => {

        this.main.topIndicator.innerHTML = topCount == 0 ? "<span style='color: transparent;'>&#11165;</span>   " : "<span>&#11165; " + topCount + "</span>";
        this.main.bottomIndicator.innerHTML = bottomCount == 0 ? "<span style='color: transparent;'>&#11167;</span>  " : "<span>" + bottomCount + " &#11167;</span>";

    }
} 

export class SimpleViewNavigate {
    main: RecycleView;
    get source() { return this.main.source; }
    get states() { return this.main.states; }
    mng: SimpleViewManage;
    constructor(main: RecycleView) {
        this.main = main;
        this.mng = main.manage;
        let _this = this;
        this.main.rowContainer.addEventListener('keydown', this.keydown_listner);
        this.main.rowContainer.addEventListener("dblclick", (e: MouseEvent) => {
            let itm = _this.getItemFromChild(e.target as HTMLElement);
            if (itm != null) {
                //_this.Events.itemDoubleClick.fire([this.main.currentIndex, e]);
            }
        });
        let oldItm = undefined;
        this.main.rowContainer.addEventListener("mousedown", (e: MouseEvent) => {
            let itm = _this.getItemFromChild(e.target as HTMLElement);
            if (itm != null) {
                let sm = bondModel.Parse(itm);
                oldItm = sm;
                //this.itemMouseDown.fire([this.main.currentIndex, e]);
            }
        });
        this.main.rowContainer.addEventListener("mouseup", (e: MouseEvent) => {
            let itm = _this.getItemFromChild(e.target as HTMLElement);
            if (itm != null) {
                let sm = bondModel.Parse(itm);
                if (oldItm == sm) {
                    this.main.currentIndex = sm.index;
                }
                //this.itemMouseUp.fire([this.main.currentIndex, e]);
            }
        });
    }
    getItemFromChild(ele: HTMLElement): HTMLElement {
        let _cntnr = this.main.rowContainer;
        while (true) {
            if (ele == null || ele == undefined || ele.parentElement == null) {
                return undefined;
            } else if (_cntnr === ele.parentElement) {
                return ele;
            } else {
                ele = ele.parentElement;
            }
        }
    }
    Events = {
        itemDoubleClick: new CommonEvent<(index: number, evt: MouseEvent) => void>(),
        itemMouseDown: new CommonEvent<(index: number, evt: MouseEvent) => void>(),
        itemMouseUp: new CommonEvent<(index: number, evt: MouseEvent) => void>(),
    }
    get lastBond() { return bondModel.Parse(this.main.rowContainer.lastChild); }
    get topBond() { return bondModel.Parse(this.main.rowContainer.firstChild); }
    doBottom(diff: number, whatToDo: 'add' | 'remove', overflow: boolean = false) {
        //let eleToRtrn: bondModel;
        if (diff > 0 /*whatToDo == 'add'*/) {
            while (diff > 0) {
                const lb = this.lastBond;
                const nextEle = this.mng.getBond(lb.index + 1);
                if (nextEle == undefined) break;
                this.main.manage.makeAlive(nextEle, this.main.rowContainer.lastElementChild);

                const h = nextEle?.height;
                diff -= h;
                if (diff < 0) {
                    if (overflow == false) {
                        nextEle.element.remove();
                        //eleToRtrn = lb;
                    } else {
                        //eleToRtrn = nextEle;
                    }
                    break;
                }
            }
        } else {
            diff *= -1;
            while (diff > 0) {
                const lb = this.lastBond;
                if (lb == undefined || lb.element.previousElementSibling == null) break;
                const h = lb.height;
                diff -= h;
                if (diff < 0) {
                    if (overflow == true) {
                        //eleToRtrn = lb;
                        lb.element.remove();
                    }
                    break;
                } else {
                    //eleToRtrn = lb;
                    lb.element.remove();
                }
            }
        }
        //return eleToRtrn;
    }
    doTop(diff: number, whatToDo: 'add' | 'remove', overflow: boolean = false) {
        if (diff > 0 /*whatToDo == 'add'*/) {
            while (diff > 0) {
                const tb = this.topBond;
                const prevEle = this.mng.getBond(tb.index - 1);
                if (prevEle == undefined) break;
                this.main.manage.makeAlive(prevEle, undefined);
                const h = prevEle?.height;
                diff -= h;
                if (diff < 0) {
                    if (overflow == false)
                        prevEle.element.remove();
                    break;
                }
            }
        } else {
            diff *= -1;
            while (diff > 0) {
                const topEle = this.topBond// this.mng.getBond(tb.index - 1);
                if (topEle == undefined || topEle.element.nextElementSibling == null) break;
                const h = topEle?.height;
                diff -= h;
                if (diff < 0) {
                    if (overflow == true)
                        topEle.element.remove();
                    break;
                } else topEle.element.remove();
            }
        }
        //return eleToRtrn;
    }
    get VsDiff() {
        const bottomEle = this.lastBond.element;
        //return this.main.scroller1.offsetHeight - this.main.ll_view.offsetHeight;
        let h = this.mng.paging ? this.main.viewport.getClientRects()[0].height : Number.MAX_SAFE_INTEGER;
        //console.log(['VsDiff',h]);
        //let oldval = this.mng.viewSize.height - (bottomEle.offsetTop + bottomEle.offsetHeight);
        let newVal = h - (this.main.rowContainer.getClientRects()[0].height);
        //return h - (bottomEle.offsetTop + bottomEle.offsetHeight);
        //console.log(['rval',oldval,newVal]);

        return newVal;
    }
    moveNext = (e: KeyboardEvent, count: number = 1) => {
        let bottomRow = this.lastBond;
        const _main = this.main;
        if (!_main.currentItem?.isConnected) {
            _main.currentIndex = this.states.topIndex;
        }
        if (_main.currentIndex < bottomRow.index) {
            _main.currentIndex++;
        } else {
            let bdiff = this.VsDiff;


            if (bdiff > 0) { // if bottom space exist
                this.doBottom(bdiff, 'add', true);
                bdiff = this.VsDiff;
            } else {
                if (_main.rowContainer.children.length == 1) {
                    this.doBottom(1, 'add', true);
                    bdiff = this.VsDiff;
                }
            }
            if (bdiff < 0) { // if bottom space exist
                this.doTop(bdiff, 'remove', true);
                bdiff = this.VsDiff;
            }
            if (bdiff > 0) {
                this.doBottom(bdiff, 'add', false);
            }
            _main.currentIndex++;
        }
    }
    movePrev = (e: KeyboardEvent, count: number = 1) => {
        let topRow = this.topBond;
        if (this.main.currentIndex > topRow.index) {
            this.main.currentIndex--;
        } else {
            let bdiff = this.VsDiff;
            if (bdiff > 0) { // if bottom space exist
                this.doTop(bdiff, 'add', true);
                bdiff = this.VsDiff;
            } else {
                if (this.main.rowContainer.children.length == 1) {
                    this.doTop(1, 'add', true);
                    bdiff = this.VsDiff;
                }
            }
            if (bdiff < 0) { // if bottom space exist
                this.doBottom(bdiff, 'remove', true);
                bdiff = this.VsDiff;
            }
            if (bdiff > 0) {
                this.doTop(bdiff, 'add', false);
            }
            this.main.currentIndex--;
        }
    }
    pageNext = (e: KeyboardEvent, count: number = 1) => {
        let _this = this;

        let lb = _this.lastBond;
        if (lb.index < _this.main.source.length - 1) {
            _this.mng.reFill((lb.index + 1));
        }

    }

    private pendingPageing = false;
    pagePrev = (e: KeyboardEvent, count: number = 1) => {
        let _this = this;
        let lb = _this.topBond;
        if (lb.index >= 1) {
            _this.mng.reFill((lb.index - 1), true);
        }

    }
    static selector(element: Element, rootEle: HTMLElement): string {

        if (element.tagName === "BODY") return "BODY";
        const names: string[] = [];
        const hasRootElement = rootEle != undefined;
        while (element.parentElement && element.tagName !== "BODY") {
            if (hasRootElement && element === rootEle) break;
            names.unshift(element.tagName + ":nth-child(" + (element["#index"]() + 1) + ")");
            element = element.parentElement;
        }
        return names.join(">");
    }
    private currentIndex() { return this.main.currentItem.index; }
    keydown_listner = (e: KeyboardEvent) => {
        if (e.defaultPrevented) return true;
        let cfg = this;
        let main = this.main;
        let selectorTxt = '';
        let focusElementInsideNewitem = false;
        if (main.currentItem != undefined && main.currentItem.isConnected) {
            let cele = main.currentItem.element;
            if (cele.contains(document.activeElement)) {
                selectorTxt = SimpleViewNavigate.selector(document.activeElement, main.currentItem.element);
                focusElementInsideNewitem = true;
            }
        }
        let cIndex = cfg.currentIndex;
        let _this = this;
        cfg.main.ArrangingContents = true;
        switch (e.code as KeyboardKey) {
            case "ArrowUp": // up key
                this.movePrev(e);
                this.mng.updateHiddenCount();
                e.preventDefault();
                break;
            case "ArrowDown": // down key
                this.moveNext(e);
                this.mng.updateHiddenCount();
                e.preventDefault();
                break;
            case "PageUp": // page up key
                if (_this.pendingPageing == true) return;
                _this.pendingPageing = true;
                requestAnimationFrame(() => {
                    _this.pagePrev(e);
                    _this.main.currentIndex = _this.topBond.index;
                    _this.pendingPageing = false;
                });
                e.preventDefault();
                break;
            case "PageDown": // page down key
                if (_this.pendingPageing == true) return;
                _this.pendingPageing = true;
                requestAnimationFrame(() => {
                    _this.pageNext(e);
                    _this.main.currentIndex = _this.lastBond.index;
                    _this.pendingPageing = false;
                });
                e.preventDefault();
                break;
        }
        cfg.main.ArrangingContents = false;
        let res = cIndex != cfg.currentIndex;
        if (focusElementInsideNewitem && res) {
            let ci = this.main.currentItem;
            if (ci != undefined && selectorTxt != '') {
                let ele = ci.element.querySelector(selectorTxt) as HTMLElement;
                if (ele != null) ele.focus();
                else TabIndexManager.moveNext(ci.element, e)
            }
        }

        return res;
    }
}