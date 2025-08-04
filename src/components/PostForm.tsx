import { Categories, UserPostFormDefaultValues } from "@/lib/constants"
import { UserPostFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField from "./CustomFormField"
import { FormFieldType } from "@/lib/types"
import { Button } from "./ui/button"
import { SelectItem } from "./ui/select"
import { Form, FormControl, FormItem, FormLabel } from "./ui/form"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import FileUploader from "./FileUploader"

const PostForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    // const router = useRouter()
    const form = useForm<z.infer<typeof UserPostFormValidation>>({
      resolver: zodResolver(UserPostFormValidation),
      defaultValues: UserPostFormDefaultValues
    })

     async function onSubmit(values: z.infer<typeof UserPostFormValidation>) {
        setIsLoading(true)

        try {
          console.log(values)
          
        } catch (error : any) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }

      }

  return (
    <div>
      <h1 className="text-xl font-medium mb-4">Fill Post Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 max-w-lg flex flex-col justify-between w-full *:w-full ">
          <div className='space-y-5'>

             <CustomFormField
                control={form.control}
                name="category"
                fieldType={FormFieldType.SELECT}
                placeholder='Category'
              >
                {Categories.map((cat, i) => (
                  <SelectItem key={i} value={cat} className="cursor-pointer">
                      <p>{cat}</p>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name='name'
                fieldType={FormFieldType.INPUT}
                placeholder='Enter Post Name'
              />
              <CustomFormField
                control={form.control}
                name='price'
                fieldType={FormFieldType.INPUT}
                placeholder='Enter Post Price'
              />
               <CustomFormField 
                  control={form.control}
                  fieldType={FormFieldType.SKELETON}
                  name='isStudent'
                  renderSkeleton={(field) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Is this price negotiable ?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col"
                        >
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="Yes" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Yes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                    )}
                  >

                </CustomFormField>
                <div>
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name='image'
                    label="All uploaded images"
                    renderSkeleton={(field)=>(
                      <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange}/>
                      </FormControl>
                    )}
                  />
                </div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  placeholder="Describe your asset..."
                />
            </div>
          <div className='space-y-2'>
            <Button  disabled={isLoading} className={'text-base py-5 w-full tracking-wide text-white rounded-lg mt-3 bg-main hover:bg-main/90'}>
              {isLoading ?(
                'Posting...'
              ):
                'Post'
              }
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}

export default PostForm