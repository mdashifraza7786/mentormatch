import mongoose from 'mongoose';
  
const MessageSchema = new mongoose.Schema({
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
      index: true, // Indexed for efficient querying
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  const Message = mongoose.model('Message', MessageSchema);
  export default Message;
  