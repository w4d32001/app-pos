import { lazy } from "react";

export const UserContainer= lazy(
    ()=> import("../../modules/users/containers/UserContainer")
)  
export const AuthContainer=lazy(
    ()=> import("../../modules/auth/containers/AurhContainer")                          
)
export const DashboardContainer=lazy(
    ()=> import("../../modules/dashboard/containers/dashboardContainer")                                 
)

export const CustomerContainer=lazy(
    ()=> import("../../modules/customer/containers/customerContainer")                                 
)
export const CategoryContainer=lazy(
    ()=> import("../../modules/category/containers/containersCategory")                                 
)
export const CompanyContainer=lazy(
    ()=> import("../../modules/company/containers/companyContainers")                                 
)
export const SupplierContainer=lazy(
    ()=> import("../../modules/supplier/containers/supplierContainers")                                 
)