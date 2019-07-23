import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let _schema = new Schema({
      title: { type: String, required: true },
      authorId: { type: ObjectId, refs: 'User', required: true },
      boardId: { type: ObjectId, ref: 'Task', required: true }
}, { timestamps: true })


_schema.pre('deleteOne', function (next) {
      Promise.all([

      ])
            .then(() => next())
            .catch(err => next(err))
})


_schema.pre('findOneAndRemove', function (next) {
      Promise.all([

      ])
            .then(() => next())
            .catch(err => next(err))
})

export default mongoose.model('Comment', _schema)