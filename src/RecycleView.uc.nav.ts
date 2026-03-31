import { CommonEvent, KeyboardKey, TabIndexManager } from 'uc-runtime/core.js';
import { bondModel, RecycleView } from "./RecycleView.uc.js";
import { SimpleViewManage } from "./RecycleView.uc.manage.js";
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