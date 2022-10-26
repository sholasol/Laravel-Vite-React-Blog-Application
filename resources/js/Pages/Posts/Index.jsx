import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/components/InputError'
import PrimaryButton from '@/components/PrimaryButton'
import {useForm, Head } from '@inertiajs/inertia-react'
import Post from '@/components/Post'
import Swal from 'sweetalert2'

function Index({auth, posts}) { //pass auth as prop
    //process form
   const {data, setData, post, processing, reset, errors} =  useForm({
    title: '',
    body: ''
    })

    //handle submit
    const submit = (e) => {
        e.preventDefault()
        //call post store route
        post(route('posts.store'), {onSuccess: ()=>reset() })

        Swal.fire({
            title: 'Success',
            text: 'Post updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

  return (
    <AuthenticatedLayout auth={auth}>
        <Head title='Posts'/>
        <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
            <form onSubmit={submit}>
                <input
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                type="text"
                placeholder="Title"
                autoFocus
                className="mb-3 block w-full border-grey-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                 />
                <InputError message={errors.title} className="mt-2 mb-2"/>

                <textarea
                value={data.body}
                onChange={e => setData('body', e.target.value)}
                type="text"
                placeholder="Body"
                className="mb-3 block w-full border-grey-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></textarea>
                <InputError message={errors.body} className="mt-2" />

                <PrimaryButton
                className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300'
                disabled={processing}
                > Create Post</PrimaryButton>
            </form>

            <div className="mt-6 bg-indigo-400 rounded-lg divide-y-4 shadow-lg">
                {
                    posts.map( post =>
                        <Post key={post.id} post={post}/>

                 )}
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Index
