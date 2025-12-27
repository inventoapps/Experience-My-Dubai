import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { Blog } from "@/models/blog";
import { TourPackage } from "@/models/package";

export default async function sitemap() {
    await connectDB()
    const tourPackages = await TourPackage.find().select("slug updatedAt");
    const activityPackages = await Activity.find().select("slug updatedAt");
    const blogs = await Blog.find().select("slug updatedAt");

    const tourPackagesUrl = tourPackages.map((p,idx)=>(
     {
        url : `https://experience-my-dubai-m58m.onrender.com/packages/${p.slug}`,
        lastModified : p.updatedAt
     }
    ));

    const activityPackagesUrl = activityPackages.map((p,idx)=>(
        {
            url : `https://experience-my-dubai-m58m.onrender.com/activity/${p.slug}`,
            lastModified : p.updatedAt
        }
    ))

    const blogsUrl = blogs.map((p,idx)=>(
        {
            url: `https://experience-my-dubai-m58m.onrender.com/blogs/${p.slug}`,
            lastModified : p.updatedAt
        }
    ));

    return [
        {
            url : "https://experience-my-dubai-m58m.onrender.com/",
            lastModified : new Date()
        }
        ,
        ...tourPackagesUrl,
        ...activityPackagesUrl,
        ...blogsUrl
    ]
}