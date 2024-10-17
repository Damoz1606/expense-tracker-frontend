import { z } from "zod";

export default z.object({
    name: z.string().min(1),
    amount: z.coerce.number().gt(0, {
        message: 'The expense must be higher than 0'
    }).refine(n => {
        return !n.toString().split('.')[1] || n.toString().split('.')[1].length <= 2;
    }, {
        message: 'Max precision is 2 decimal places'
    }),
    budget: z.coerce.number()
});