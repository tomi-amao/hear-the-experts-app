import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { forwardRef } from "react";


// interface Props {
//   children?: ReactNode;
//   value?: string;
//   // ref?: any
// }


export type Ref = any;

export interface AccordionItemProps{}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <AccordionDemo/>
  )
}


const AccordionDemo = () => (
  <Accordion.Root
    className="bg-mauve2 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger  >Is it accessible?</AccordionTrigger>
      <AccordionContent >Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and feel.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

const AccordionItem = forwardRef<AccordionItemProps, Ref>(({ children, ...props }, forwardedRef ) => (
  <Accordion.Item
    className=
      'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]'
      
    
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = forwardRef<Ref, Accordion.AccordionHeaderProps>(({ children, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className=
        'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none'
        
      
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = forwardRef<Ref, Accordion.AccordionContentProps>(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    className=
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]'
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));


// export async function action({request} :ActionFunctionArgs) {
//     const formData = await request.formData()
//     const darkToggle =  Object.fromEntries(formData)
//     console.log(darkToggle);
//     console.log('hello');
    
    
  
//   }

