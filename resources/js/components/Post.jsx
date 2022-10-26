import React, { useState } from 'react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//dropdown menu
import Dropdown from '@/components/Dropdown'
import InputError from '@/components/InputError'
import PrimaryButton from '@/components/PrimaryButton'
import {useForm, usePage} from '@inertiajs/inertia-react'
import Swal from 'sweetalert2'
//configuring dayjs
dayjs.extend(relativeTime)

function Post({post}) {

    const {auth} = usePage().props
    const [ editing, setEditing]  = useState(false)
    const {data, setData, patch, processing, reset, errors} = useForm({
        title: post.title,
        body: post.body
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('posts.update', post.id),{onSuccess: ()=>setEditing(false)})
        Swal.fire({
            title: 'Success',
            text: 'Post created successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

  return (
    <div className='p-5 flex space-x-2'>

        <div className="flex-1">
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-white">{post.user.firstname} </span>
                    <small className="ml-2 text-sm text-white">{dayjs(post.created_at).fromNow()}</small>
                    {post.created_at !== post.updated_at && <small className='text-sm text-gray-600'>&middot; edited</small>}
                </div>
                {
                    post.user_id === auth.user.id &&
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className='text-white'>
                                ...
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                            className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-200'
                            onClick={ ()=> setEditing(true)}
                            >
                                edit
                            </button>
                            <Dropdown.Link
                            as="button"
                            href={route('posts.destroy', post.id)}
                            method='delete'
                        >
                            Delete
                        </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                }
            </div>
            { editing ? <form onSubmit={submit}>
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
                    <div className="space-x-2">
                        <PrimaryButton
                        className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300'
                        disabled={processing}
                        > Update Post</PrimaryButton>
                        <button
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            onClick={()=>setEditing(false) && reset()}>
                            Cancel
                        </button>
                    </div>

                </form>
                :(
                    <>
                        <p className="mt-4 text-lg text-white">{post.title}</p>
                        <p className="mt-4 text-white">{post.body}</p>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Post
