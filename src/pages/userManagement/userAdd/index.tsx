import SVGIcon from "@/components/ui/svgIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Age is required",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be less than 20 characters.",
    })
    .describe("required"),
  contactDetail: z
    .number({
      invalid_type_error: "please input valid phone number",
    })
    .lt(11)
    .describe("required"),
  paperwork: z.string().describe("required"),
  remark: z.string().optional(),
  account: z.string().describe("required"),
  password: z.number().describe("required"),
  systemName: z.string().describe("required"),
  systemLogo: z.string().describe("required"),
});

function RequiredIndicator({
  name,
}: {
  name: keyof z.infer<typeof formSchema>;
}) {
  const description = formSchema.shape[name].description;
  return description === "required" ? (
    <span className="text-red-500">*</span>
  ) : null;
}

function FormFieldRenderer({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  isTextarea = false,
}: {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  isTextarea?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-5">
          <FormControl>
            <div className="flex items-center">
              <FormLabel>
                <RequiredIndicator
                  name={name as keyof z.infer<typeof formSchema>}
                />
                {label}
              </FormLabel>
              {isTextarea ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  className="max-w-[450px]"
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  className="max-w-[252px]"
                />
              )}
              {description && (
                <FormDescription className="ml-5 text-xs">
                  {description}
                </FormDescription>
              )}
            </div>
          </FormControl>
          <FormMessage className="ml-20" />
        </FormItem>
      )}
    />
  );
}

const formFields = [
  {
    name: "username",
    label: "姓名",
    placeholder: "请输入姓名",
  },
  {
    name: "contactDetail",
    label: "联系方式",
    placeholder: "请输入联系方式",
  },
  {
    name: "paperwork",
    label: "用户证件",
    type: "file",
  },
  {
    name: "remark",
    label: "备注",
    placeholder: "请输入备注",
    isTextarea: true,
  },
  {
    name: "account",
    label: "账号",
    placeholder: "请输入账号",
  },
  {
    name: "password",
    label: "密码",
    placeholder: "请输入密码",
    description: "密码由不小于8位的字母和数字组成",
    type: "password",
  },
  {
    name: "systemName",
    label: "系统昵称",
    placeholder: "输入您想要的系统名称",
    description: "输入您想要的系统名称",
  },
  {
    name: "systemLogo",
    label: "系统logo",
    placeholder: "选择您的logo，格式为xxx",
    description: "选择您的logo，格式为xxx",
    type: "file",
  },
];

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white rounded-xl px-4"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <Separator className="mb-5" />
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
function UserAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      account: "test",
      password: 12345678910,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-4/5 mx-auto my-5">
      <h3 className="flex space-x-0.5 items-center">
        <SVGIcon name="back" size={20}></SVGIcon>
        <span className="text-xl font-bold leading-6">用户添加</span>
      </h3>
      <div className="flex flex-col space-y-2 py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <AccordionSection title="基本信息">
              {formFields.slice(0, 4).map((field) => (
                <FormFieldRenderer
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  type={field.type}
                  isTextarea={field.isTextarea}
                />
              ))}
            </AccordionSection>

            <AccordionSection title="账号信息">
              {formFields.slice(4).map((field) => (
                <FormFieldRenderer
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  type={field.type}
                  isTextarea={field.isTextarea}
                />
              ))}
            </AccordionSection>
            <div className="flex space-x-3 justify-end mt-4">
              <Button variant="outline">取消</Button>
              <Button type="submit">确定</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UserAdd;
