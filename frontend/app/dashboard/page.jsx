"use client";



import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function DashboardPage() {
  const { data: session } = useSession();
  const [getUserData, setGetUserData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Data, setDate] = useState(false);
  const [inputData, setInputData] = useState({
    profile_pic: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    full_name: null,
  });

  useEffect(() => {
    const get_user = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://full-stack-jwt-authentication.onrender.com/api/users/${session?.user?.id}/`
        );
        const data = response.data;
        if (data) {
          setGetUserData(data);
        }
      } catch (error) {
        throw new Error(`User data if field : ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      get_user();
    }

    const date = new Date(getUserData?.last_login);
    setDate(date);
  }, [session]);

  const updateUser = async (e) => {
    e.preventDefault();
    const tosId = toast.loading("Loading...");
    setLoading(true);
    const formData = new FormData();
    for (const key in inputData) {
      console.log(key, "key");
      if (inputData[key] !== null && inputData !== "") {
        formData.append(key, inputData[key]);
      }
    }
    try {
      const response = await axios.patch(
        `https://full-stack-jwt-authentication.onrender.com/api/users/${session?.user?.id}/`,
        formData
        // {
        //   headers: {
        //     Authorization: `Bearer ${session?.accessToken}`,
        //   },
        // }
      );
      const data = response.data;
      if (data) {
        setGetUserData(data);
        toast.success(`Successfully updata user`);
      }
    } catch (err) {
      toast.error(`user update is field`);
      console.error(`User update is field : ${err}`);
    } finally {
      toast.dismiss(tosId);
      setLoading(false);
    }
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                   Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>User</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="mb-6">
                <h1 className=" text-red-800  text-2xl">
                  {" "}
                  Server User Authentication Data{" "}
                </h1>

                <div>
                  <h2> User Object </h2>

                  <ul>
                    <li> User Id : {session?.user?.id} </li>
                    <li> exp : {session?.user?.exp}</li>
                    <li> iat : {session?.user?.iat}</li>
                    <li className=" text-wrap">
                      {" "}
                      Authorized Access Token : {session?.accessToken}{" "}
                    </li>
                    <li> Refresh Token : {session?.refreshToken} </li>
                    <li> Expires Date {session?.expires} </li>
                  </ul>
                </div>
              </div>

       
                <div className="mt-4 grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-2">
                  <form
                    onSubmit={updateUser}
                    className="w-full max-w-lg space-y-3"
                  >
                    <h1 className=" text-red-800  text-2xl">
                      {" "}
                      Update User Form{" "}
                    </h1>

                    <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid gap-4">
                      <div className="w-full  space-y-3 ">
                        <div>
                          <Label htmlFor="picture">Profile Picture</Label>
                          <Input
                            required
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                profile_pic: e.target.files[0],
                              })
                            }
                            id="picture"
                            type="file"
                            className="mt-1 file:pt-0.5"
                          />
                        </div>
                        <div>
                          <Label className="" htmlFor="email">
                            Email
                          </Label>
                          <Input
                            required
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                email: e.target.value,
                              })
                            }
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="mt-0.5"
                          />
                        </div>

                        <div>
                          <Label className="" htmlFor="Username">
                            Username
                          </Label>
                          <Input
                    
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                username: e.target.value,
                              })
                            }
                            id="Username"
                            type="text"
                            placeholder="Username"
                            className="mt-0.5"
                          />
                        </div>
                      </div>

                      <div className="w-full space-y-3 ">
                        <div>
                          <Label className="" htmlFor="   First Name">
                            First Name
                          </Label>
                          <Input
                            required
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                first_name: e.target.value,
                              })
                            }
                            id="First Name"
                            type="text"
                            placeholder="First Name"
                            className="mt-0.5"
                          />
                        </div>

                        <div>
                          <Label className="" htmlFor="    Last Name">
                            Last Name
                          </Label>
                          <Input
                            required
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                last_name: e.target.value,
                              })
                            }
                            id="Last Name"
                            type="Last Name"
                            placeholder="Last Name"
                            className="mt-0.5"
                          />
                        </div>

                        <div>
                          <Label className="" htmlFor=" Full Name">
                            Full Name
                          </Label>
                          <Input
                            required
                            onChange={(e) =>
                              setInputData({
                                ...inputData,
                                full_name: e.target.value,
                              })
                            }
                            id="Full Name"
                            type="Full Name"
                            placeholder="Full Name"
                            className="mt-0.5"
                          />
                        </div>
                      </div>

                      <div>
                        <Button type="submit">
                          {" "}
                          {Loading ? (
                            <span className="flex items-center">
                              {" "}
                              <Loader2 className="  animate-spin w-5 h-5 mr-2" />{" "}
                              <span>Loading...</span>{" "}
                            </span>
                          ) : (
                            "Update"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>

                  <div>
                    <h1 className=" text-red-800  text-2xl">
                      {" "}
                      Server User data
                    </h1>

                    <div>
                      <ul>
                        <li>User Id : {getUserData?.id}</li>
                        <li>Profile Image : {getUserData?.profile_pic}</li>
                        <li>Username : {getUserData?.username}</li>
                        <li>Email : {getUserData?.email}</li>
                        <li>First Name : {getUserData?.first_name}</li>
                        <li>Last Name : {getUserData?.last_name}</li>
                      </ul>
                    </div>
                  </div>
            
              </div>
     

          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
