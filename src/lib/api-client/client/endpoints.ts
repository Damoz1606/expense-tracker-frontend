import { ApiResource } from "../_base/api-resource.type";

const endpoints = {
    //#region User
    userCreate: {
        method: 'post',
        resource: 'user'
    } as ApiResource,
    retriveMe: {
        method: 'get',
        resource: 'user'
    } as ApiResource,
    //#endregion
    //#region Budget
    budgetRetriveActivity: {
        method: 'get',
        resource: 'budget/activity'
    } as ApiResource,
    budgetCreate: {
        method: 'post',
        resource: 'budgets'
    } as ApiResource,
    budgetRetriveArray: {
        method: 'get',
        resource: 'budgets'
    } as ApiResource,
    budgetRetrive: {
        method: 'get',
        resource: 'budgets/budget/:id'
    } as ApiResource,
    budgetUpdate: {
        method: 'put',
        resource: 'budgets/budget/:id'
    } as ApiResource,
    budgetDelete: {
        method: 'delete',
        resource: 'budgets/budget/:id'
    } as ApiResource,
    //#endregion
    //#region Expense
    expenseCreate: {
        method: 'post',
        resource: 'expenses'
    } as ApiResource,
    expenseRetrive: {
        method: 'get',
        resource: 'expenses'
    } as ApiResource,
    expenseLastest: {
        method: 'get',
        resource: 'expenses/top/latest'
    } as ApiResource,
    expenseDelete: {
        method: 'delete',
        resource: 'expenses/:id'
    } as ApiResource,
    //#endregion
}

export default endpoints;