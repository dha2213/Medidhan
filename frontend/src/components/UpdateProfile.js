import React, { useState } from "react";
import Profile from "./Profile";
// import { navigate } from "gatsby";



const UpdateProfile = () => {
  const [image,setImage]= useState();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    age: "",
    dateOfBirth: "",
    profilePhoto: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, reEnterPassword } = formData;
    if (password !== reEnterPassword) {
      console.error("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("email");

    const userObject = {
      email,
      ...formData,
    };
 
    try {
      const response = await fetch(
        "https://medidhan.onrender.com/api/profile/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        }
      );
      const data = await response.json();
      console.log(data);
      localStorage.setItem("email", email);
      // navigate("/OTPVerification");
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    console.log("Form submitted:", formData);
  };

  const profilchange = (e)=>{
    console.log(e.target.files[0])
    setImage(e.target.files[0]);
  }

  return (
    <body className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
     
    

       
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col" style={{ justifyContent: 'center' , backgroundColor:'red'}}>
      <section className="bg-cream-lighter p-4 shadow" style={{ justifyContent: 'center' , backgroundColor:'blue'}}>

          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              Your Profile
            </h2>
          
          </div>
          <form onSubmit={handleSubmit} className="profileContainer" style={{ alignItems:'center', justifyContent:'center', backgroundColor:'green',width:'50%'}}>
            <div className="md:flex mb-8">
               
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-xs font-bold">
                    Full Name
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={formData.fullName}
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Address
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="address"
                    placeholder="123 Main St"
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Age
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="number"
                    name="age"
                    placeholder="30"
                    onChange={handleChange}
                    value={formData.age}
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Date of Birth
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChange}
                    value={formData.dateOfBirth}
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profilePhoto: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Password
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Re-Enter Password
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="password"
                    name="reEnterPassword"
                    placeholder="Re - Enter Password"
                    onChange={handleChange}
                    value={formData.reEnterPassword}
                  />
                </div>
              </div>
            </div>
            <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <input type="hidden" name="sponsor" value="0" />
                <input
                  className="button text-cream-lighter bg-brick hover:bg-brick-dark"
                  type="submit"
                  value="Update Profile"
                  style={{
                    backgroundColor: "#8B0000",
                    border: "none",
                    color: "#FFF",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                />
              </div>
            </div>
          </form>
        </section>
      </main>

    </body>
  );
};

export default UpdateProfile;
