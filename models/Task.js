import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
    description: { type: String, trim: true, default: '' },
    dueAt: { type: Date, required: [true, 'Date and time are required'] },
    endsAt: { type: Date, default: null },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);