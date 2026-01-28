'use client'
import zodResolver from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {useDebounceValue} from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Sign } from 'crypto'
import { signUpSchema } from '@/src/schemas/signUpSchema'


function page() {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isChecingUsername,setIsChecingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const debouncedUsername=useDebounceValue(username,300)

  const router=useRouter();

  //zod implementation
  const form=useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique=async()=>{
      if(debouncedUsername){
        setIsChecingUsername(true)
        setUsernameMessage('')

        try {
          
        } catch (error) {
          
        }
      }
    }
  }
  ,[debouncedUsername])

  return (
    <div>page</div>
  )
}

export default page