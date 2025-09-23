import z from "zod"

const MIN_TRANSACTION_VALUE = 0.01

export const newTransactionFormSchema = z.object({
  description: z.string().nonempty({ error: "A descrição é obrigatória" }),
  value: z
    .number({ error: "O valor é obrigatório" })
    .min(MIN_TRANSACTION_VALUE, { error: "O valor deve ser maior que zero" }),
  categoryId: z
    .number({ error: "A categoria é obrigatória" })
    .min(1, { error: "A categoria é obrigatória" }),
  typedId: z
    .number({ error: "O tipo de transação é obrigatório" })
    .min(1, { error: "O tipo de transação é obrigatório" }),
})

export type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>
