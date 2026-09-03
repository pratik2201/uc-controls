
import { UserResource, ResourceStorage,UpdateResourcePath, Assembly, AssemblyManager } from "uc-runtime/core-main.js";

import fs from "fs";
import path from "path";

declare module "uc-runtime/core-main" {
   export interface ResourceNamedRegistry{
      
   }

   export interface TPPackage {
        
   }

   
   export interface AssemblyRegistry{
        "uc-controls" : Assembly
   }
   export interface ResourceKeyRegistry {
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000": "",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001": "uc-controls\\styles.scss",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002": "",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003": "uc-controls\\src\\RecycleView.uc.html",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004": "uc-controls\\src\\RecycleView.uc.scss",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005": "uc-controls\\src\\WinFrame.uc.html",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006": "uc-controls\\src\\WinFrame.uc.scss",
        
   }
}
const Resources:UserResource[] = [

    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000",   project: "uc-controls",  source: "",   type: "string",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001",   project: "uc-controls",  source: "uc-controls\\styles.scss",   type: "css",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002",   project: "uc-controls",  source: "",   type: "string",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003",   project: "uc-controls",  source: "uc-controls\\src\\RecycleView.uc.html",   type: "html",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004",   project: "uc-controls",  source: "uc-controls\\src\\RecycleView.uc.scss",   type: "css",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.html",   type: "html",  encrypt:false   }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.scss",   type: "css",  encrypt:false   }, 
];
ResourceStorage.bulkRegister(Resources);

export async function loadAssembly(prePath: string = "") {

    AssemblyManager.Register(UpdateResourcePath({
         name: "uc-controls",
         ProjectGUID: "e88aa70c-55a2-452f-ba44-e28f2bca81ba",
         ProjectCSS: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001",
         ProjectUcConfig: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002",
         ResourceStorageDir: "out/designerFiles/files",
    }, prePath));

    ResourceStorage.RuntimeProps['importmap'] = ResourceStorage.RuntimeProps['importmap'] ?? ResourceStorage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000");
    
    (await import("uc-runtime/designerFiles/Resources.js")).loadAssembly('node_modules/uc-runtime');
}
// console.log(fs.readFileSync(path.resolve('node_modules',"uc-controls", 'package.json'), 'binary'));

