import { useState } from "react";
import { Wrapper } from "../components";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import toast from "react-hot-toast";
import { Loader2, Trash2Icon } from "lucide-react";

const CreateProperty = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          toast.success(`Image uploaded successfully`)
          setUploading(false);
        })
        .catch(() => {
            toast.error(`Image uploaded failed!`)
          setUploading(false);
        });
    } else {
        toast.error(`Something went wrong!`)
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
     setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, inx) => inx !== index)
     })
     toast.success("Image deleted!")
  }

  return (
    <Wrapper>
      <main className="w-full h-full flex items-center justify-center py-20">
        <section className="size-full px-2 sm:max-w-xl md:max-w-2xl sm:px-5 flex flex-col items-center justify-center gap-5 text-white">
          <h1 className="capitalize text-3xl font-semibold tracking-wide mb-16">
            Fill you property details Below
          </h1>
          <form className="w-full flex flex-col gap-8">
            <label htmlFor="name" className="space-y-2">
              <span className="font-medium text-xl">Property Name</span>
              <input
                type="text"
                id="name"
                className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
                required
              />
            </label>
            <label htmlFor="description" className="space-y-2">
              <span className="font-medium text-xl">Description</span>
              <textarea
                rows={3}
                id="description"
                className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
                required
              />
            </label>
            <label htmlFor="address" className="space-y-2">
              <span className="font-medium text-xl">Address</span>
              <input
                type="text"
                id="address"
                className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-base xl:text-lg font-medium"
                required
              />
            </label>
            <label htmlFor="type" className="space-y-2">
              <span className="font-medium text-xl">Property Type</span>
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sale"
                    className="bg-red-500  rounded-full"
                  />
                  <h3 className="font-medium">Sale</h3>
                </span>
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rent"
                    className="bg-red-500  rounded-full"
                  />
                  <h3 className="font-medium">Rent</h3>
                </span>
              </div>
            </label>
            <label htmlFor="furnished" className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="bg-red-500  rounded-full"
              />
              <span className="font-medium text-xl">Furnished</span>
            </label>
            <label htmlFor="parking" className="flex gap-2 items-center -mt-3">
              <input
                type="checkbox"
                id="parking"
                className="bg-red-500  rounded-full"
              />
              <span className="font-medium text-xl">Parking Spot</span>
            </label>
            <label htmlFor="offer" className="flex gap-2 items-center -mt-3">
              <input
                type="checkbox"
                id="offer"
                className="bg-red-500  rounded-full"
              />
              <span className="font-medium text-xl">Offer</span>
            </label>
            <div className="w-full flex items-center justify-between gap-10">
              <label htmlFor="bedrooms" className="w-full space-y-2">
                <span className="font-medium text-xl">Bedrooms</span>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-lg font-medium"
                  required
                />
              </label>
              <label htmlFor="bathrooms" className="w-full space-y-2">
                <span className="font-medium text-xl">Bathrooms</span>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-lg font-medium"
                  required
                />
              </label>
            </div>
            <div className="w-full flex items-center justify-between gap-10">
              <label htmlFor="regularPrice" className="w-full space-y-2">
                <span className="font-medium text-xl">Regular Price</span>
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-lg font-medium"
                />
              </label>
              <label htmlFor="discountPrice" className="w-full space-y-2">
                <span className="font-medium text-xl">Discount Price</span>
                <input
                  type="number"
                  id="discountPrice"
                  min="50"
                  max="10000000"
                  required
                  className="w-full bg-dark-2 px-4 py-4 rounded-md border border-dark-3 outline-none text-gray-2 placeholder:text-gray-2 text-lg font-medium"
                />
              </label>
            </div>
            <div className="w-full flex flex-col gap-5 items-start">
              <span className=" flex items-start flex-col gap-2">
                <h1 className="font-medium text-xl">Images</h1>
                <p>The first image will be the cover (max 6)</p>
              </span>
              <div className="w-full flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full border border-gray-1 p-5 rounded-lg bg-dark-2 hover:bg-dark-3 transition cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  className="bg-white px-4 py-4 font-medium text-lg hover:bg-white/80 transition rounded-lg text-dark-2 disabled:cursor-not-allowed disabled:bg-white/80"
                >
                {uploading ? <p>Uploading....</p> : "Upload"} 
                </button>
              </div>
             
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-5">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((imageUrl, index) => (
                <div key={index} className="w-full h-full relative ">
                  <img
                    src={imageUrl}
                    alt="Property Image"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                    />
                    <button type="button" onClick={() => handleImageDelete(index)} className="bg-red-600 hover:bg-red-500 transition rounded p-1 absolute top-1 right-1 cursor-pointer ">
                        <Trash2Icon className="size-4 text-white"/>
                    </button>
                </div>
              ))}
              </div>
            <button
              type="submit"
              className="bg-purple-1 hover:bg-purple-1/70 transition rounded-lg px-5 py-4 text-white font-semibold w-full"
            >
              {loading ? (
              <Loader2 className="mx-auto animate-spin text-base text-white" />
            ) : (
              "Create Post"
            )}
            </button>
          </form>
        </section>
      </main>
    </Wrapper>
  );
};

export default CreateProperty;
