 import { Usercontrol,intenseGenerator,IUcOptions,ResourceManage } from "uc-runtime/core.js";
 import { leftMenu } from "./../leftMenu.uc.js";


export class leftMenu$Designer extends Usercontrol {    
    
    get(id:"") {
        return this.ucExtends.find(`[id="${id}"]`)[0];
    }
    
    
    constructor(){ super(); }

    

    static Create(pera: IUcOptions, ...args: any[]) {
       return ( intenseGenerator.generateUC(leftMenu,  pera, ...args)) as leftMenu;
    }

    initializecomponent?(args: IUcOptions, form: leftMenu){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004");

         ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }



    static  async CreateAsync(pera: IUcOptions, ...args: any[]) {
       return ( await  intenseGenerator.generateUCAsync(leftMenu,  pera, ...args)) as leftMenu;
    }

     async initializecomponentAsync?(args: IUcOptions, form: leftMenu){
        const ucExt = this.ucExtends;
        args.guid = "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004";
        args.htmlContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003");
        args.cssContent = ResourceManage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004");

         await  ucExt.initializecomponent(args);                
        const CONTROLS = ucExt.controls; 

        

        if(args.events?.beforeFinalize!=undefined) args.events?.beforeFinalize(form);
        ucExt.finalizeInit(args);        
        delete this.initializecomponent; 
        delete this.initializecomponentAsync; 
        ucExt.takeoff();
    }


}

