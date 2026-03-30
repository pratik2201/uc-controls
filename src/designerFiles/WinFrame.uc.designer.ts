 import { Usercontrol,intenseGenerator,IUcOptions,ResourceManage } from "uc-runtime/core.js";
 import { WinFrame } from "./../WinFrame.uc.js";


export class WinFrame$Designer extends Usercontrol {    
    
    get(id:"") {
        return this.ucExtends.find(`[id="${id}"]`)[0];
    }
    public titlebar1!: HTMLElement;
    public lbl_title!: HTMLElement;
    public cmd_restore!: HTMLElement;
    public cmd_max!: HTMLElement;
    public cmd_close!: HTMLElement;
    public container1!: HTMLElement;
    
    
    constructor(){ super(); }

    

    static Create(pera: IUcOptions, ...args: any[]) {
       return ( intenseGenerator.generateUC(WinFrame,  pera, ...args)) as WinFrame;
    }

    initializecomponent?(args: IUcOptions, form: WinFrame){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006");

        ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        
        this.titlebar1 = CONTROLS.titlebar1  as unknown as HTMLElement;
        this.lbl_title = CONTROLS.lbl_title  as unknown as HTMLElement;
        this.cmd_restore = CONTROLS.cmd_restore  as unknown as HTMLElement;
        this.cmd_max = CONTROLS.cmd_max  as unknown as HTMLElement;
        this.cmd_close = CONTROLS.cmd_close  as unknown as HTMLElement;
        this.container1 = CONTROLS.container1  as unknown as HTMLElement;

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }



    static  async CreateAsync(pera: IUcOptions, ...args: any[]) {
       return ( await  intenseGenerator.generateUCAsync(WinFrame,  pera, ...args)) as WinFrame;
    }

     async initializecomponentAsync?(args: IUcOptions, form: WinFrame){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006");

        ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        
        this.titlebar1 = CONTROLS.titlebar1  as unknown as HTMLElement;
        this.lbl_title = CONTROLS.lbl_title  as unknown as HTMLElement;
        this.cmd_restore = CONTROLS.cmd_restore  as unknown as HTMLElement;
        this.cmd_max = CONTROLS.cmd_max  as unknown as HTMLElement;
        this.cmd_close = CONTROLS.cmd_close  as unknown as HTMLElement;
        this.container1 = CONTROLS.container1  as unknown as HTMLElement;

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }


}

