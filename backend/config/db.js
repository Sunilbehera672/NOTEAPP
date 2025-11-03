    import mongoose from 'mongoose'

    export async function connectToDb(){
        try {
            await mongoose.connect( "mongodb://127.0.0.1:27017/NoteApp");
            
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
