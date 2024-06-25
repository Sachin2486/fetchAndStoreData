import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/PMS');

const storeSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

const Post = mongoose.model('Post',storeSchema);

async function fetchData (){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    for(let i=0;i<data.length;i++){

       const post =  new Post({
            user_id : data[i]['userId'],
            id : data[i]['id'],
            title : data[i]['title'],
            description : data[i]['body']
        })
        post.save()
    }
}

fetchData();