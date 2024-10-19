import { z } from "zod";

export default z.object({
    name: z.string().min(1, {
        message: 'Name cannot be empty'
    }).max(64, {
        message: 'Name must have less than 64 characters'
    }),
    amount: z.coerce.number().gt(0, {
        message: 'Expense must be higher than 0'
    }).refine(n => {
        return !n.toString().split('.')[1] || n.toString().split('.')[1].length <= 2;
    }, {
        message: 'Max precision is 2 decimal places'
    })
});