import Header from "@/components/shared/Header"
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants/constants"
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const AddTransformationTypePage = async ({params: {type} }:SearchParamProps) => {
    const authResult = await auth();
    const { userId } = authResult;
    const transformation = transformationTypes[type];

    if(!userId) redirect('/sign-in');

    const user = await getUserById(userId);

    return (
        <div>
            <Header 
            title={transformation.title} 
            subtitle={transformation.subTitle} 
            />
            <section className="mt-10">
              <TransformationForm 
                action="Add" 
                userId={user._id} 
                type={transformation.type as TransformationTypeKey} 
                creditBalance={user.creditBalance} 
              />
            </section>
        </div>
    )
}

export default AddTransformationTypePage
