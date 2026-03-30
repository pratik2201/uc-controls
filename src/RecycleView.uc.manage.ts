import { bondModel, RecycleView, RecycleViewState } from "./RecycleView.uc.js";
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
        vh = _this.paging ? _this.main.viewport.getClientRects()[0].height : Number.MAX_SAFE_INTEGER;//vh == 0 ? _this.main.scroller1.getClientRects()[0].height : vh;
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




// private resizerCall = ({ width = 0, height = 0 }: { width: number, height: number }, callRefresh = true): void => {
//     //console.log(['current', this.viewSize.width,this.viewSize.height]);
//     //console.log(['diff', this.viewSize.width-width,this.viewSize.height-height,width,height]);
//     // console.log(['OLD_HEIGHT',height]);
//     return;
//     height = Math.floor(height / SimpleViewManage.FrectionSize) * SimpleViewManage.FrectionSize;
//     //console.log(['NEW_HEIGHT',height]);

//     let diffw = this.viewSize.width - width;
//     let diffh = this.viewSize.height - height;

//     console.log(['resizerCall_HEIGHT', height]);
//     this.viewSize.setBy.value(width, height);

//     if (!(diffw == 0 && diffh == 0))
//         this.reFill();
//     //console.log(this.viewSize);
//     //config.setPos();
// }