 import { Usercontrol,intenseGenerator,IUcOptions,ResourceManage } from "uc-runtime/core.js";
 import { RecycleView } from "./../RecycleView.uc.js";


export class RecycleView$Designer extends Usercontrol {    
    
    get(id:"") {
        return this.ucExtends.find(`[id="${id}"]`)[0];
    }
    public topIndicator!: HTMLElement;
    public viewport!: HTMLElement;
    public rowContainer!: HTMLElement;
    public bottomIndicator!: HTMLElement;
    public vscrollbar1!: HTMLElement;
    
    
    constructor(){ super(); }

    

    static Create(pera: IUcOptions, ...args: any[]) {
       return ( intenseGenerator.generateUC(RecycleView,  pera, ...args)) as RecycleView;
    }

    initializecomponent?(args: IUcOptions, form: RecycleView){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004");

        ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        
        this.topIndicator = CONTROLS.topIndicator  as unknown as HTMLElement;
        this.viewport = CONTROLS.viewport  as unknown as HTMLElement;
        this.rowContainer = CONTROLS.rowContainer  as unknown as HTMLElement;
        this.bottomIndicator = CONTROLS.bottomIndicator  as unknown as HTMLElement;
        this.vscrollbar1 = CONTROLS.vscrollbar1  as unknown as HTMLElement;

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }



    static  async CreateAsync(pera: IUcOptions, ...args: any[]) {
       return ( await  intenseGenerator.generateUCAsync(RecycleView,  pera, ...args)) as RecycleView;
    }

     async initializecomponentAsync?(args: IUcOptions, form: RecycleView){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004");

        ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        
        this.topIndicator = CONTROLS.topIndicator  as unknown as HTMLElement;
        this.viewport = CONTROLS.viewport  as unknown as HTMLElement;
        this.rowContainer = CONTROLS.rowContainer  as unknown as HTMLElement;
        this.bottomIndicator = CONTROLS.bottomIndicator  as unknown as HTMLElement;
        this.vscrollbar1 = CONTROLS.vscrollbar1  as unknown as HTMLElement;

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }


}

