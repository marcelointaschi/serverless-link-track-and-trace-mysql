export default {
  type: "object",
  properties: {
    customer_id: { type: 'string' },
    destination : { type: 'string' },
    origin_type : { type: 'string' },
    origin_value : { type: 'string' },
    action_type : { type: 'string' }
  },
  required: ['customer_id']
} as const;