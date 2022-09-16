// Please note - This will be used as a sub-schema for the `reaction` fields  in the `Thought` data model.
// Please note - This will be used as a sub-schema for the `reaction` fields  in the `Thought` data model.

const { Schema } = require("mongoose");
const { formatTimestamp } = require("../utils");

const reactionSchema = {
  reactionId: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: formatTimestamp,
  },
};

const schema = new Schema(reactionSchema);

module.exports = schema;
