import {fetchFilteredCustomers} from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({searchParams}: {
  searchParams: {
    query?: string
  }
}) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..."/>
      </div>
      <Suspense key={query} fallback={<InvoicesTableSkeleton/>}>
        <CustomersTable customers={customers}/>
      </Suspense>
    </div>
  )
}