import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  BuildingStorefrontIcon,
  CogIcon,
  ArrowRightIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface StoreDetails {
  storeName: string;
  customDomain: string;
  storeDescription: string;
}

interface ProductField {
  id: number;
  fieldName: string;
  fieldType: 'text' | 'number' | 'image' | 'dropdown' | 'textarea';
}

interface Step {
  id: string;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
  icon: React.ElementType;
}


const StepperThemedDark: React.FC<{ steps: Step[] }> = ({ steps }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-6 pr-4">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex items-start">
            {/* Connecting line */}
            {stepIdx !== steps.length - 1 ? (
              <div className="absolute left-3 top-3 -ml-px mt-1 h-full w-0.5 bg-gray-800" aria-hidden="true" />
            ) : null}
            {/* Step Circle/Icon */}
            <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
              {step.status === 'complete' ? (
                <CheckCircleIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
              ) : step.status === 'current' ? (
                <>
                  {/* Subtle glow/ring effect could be added here if desired */}
                  <span className="absolute h-4 w-4 rounded-full bg-purple-900/30" aria-hidden="true" />
                  <span className="relative block h-2 w-2 rounded-full bg-purple-400" aria-hidden="true" /> {/* Accent Color */}
                </>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-700" aria-hidden="true" />
              )}
            </div>
            {/* Step Name */}
            <div className="ml-3 min-w-0">
              <span className={`text-sm font-medium ${step.status === 'current' ? 'text-purple-400' : step.status === 'complete' ? 'text-gray-300' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};


const StoreSetupSeamlessDark: React.FC = () => {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>({
    storeName: '',
    customDomain: '',
    storeDescription: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [productFields, setProductFields] = useState<ProductField[]>([]);

  const steps: Step[] = [
    { id: '01', name: 'Store Details', status: 'current', icon: BuildingStorefrontIcon },
    { id: '02', name: 'Product Schema', status: 'upcoming', icon: CogIcon },
  ];

  // --- Handlers ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (logoPreview) { URL.revokeObjectURL(logoPreview); } // Cleanup previous
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  const handleRemoveLogo = () => {
    if (logoPreview) { URL.revokeObjectURL(logoPreview); } // Cleanup previous
    setLogoFile(null);
    setLogoPreview(null);
  };

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { ...storeDetails, logo: logoFile };
    console.log('Seamless Dark - Form Data:', formData);

    const token = await getToken();
    console.log(token);

    const req = await fetch('http://localhost:5000/api/store/launch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: storeDetails.storeName,
        slug: storeDetails.customDomain,
        description: storeDetails.storeDescription
      })
    })

    const res = await req.json();
    console.log(res);

    if (typeof res.response === "string") {
      navigate(`/dashboard/store?id=${res.response}`);
    }

  };


  // Effect for Object URL cleanup
  useEffect(() => {
    return () => { if (logoPreview) { URL.revokeObjectURL(logoPreview); } };
  }, [logoPreview]);

  // --- Render ---
  return (
    // Overall page wrapper: full height flex column, near-black bg
    <div className="bg-gray-950 min-h-screen text-gray-300 flex flex-col">

      {/* Top section for backlink */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 flex-shrink-0">
        <div className="mb-6">
          <a href="#" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors duration-150">
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to Dashboard
          </a>
        </div>
      </div>

      {/* Main Content Area: Centered, grows to fill vertical space */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow pb-8 md:pb-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-12">

          {/* Left Column: Stepper Navigation */}
          <aside className="md:col-span-3 lg:col-span-3 mb-8 md:mb-0 md:border-r md:border-gray-800 md:pr-8 pt-2">
            <h2 className="text-lg font-semibold text-gray-300 mb-6 hidden md:block">Store Setup</h2>
            <StepperThemedDark steps={steps} />
          </aside>

          {/* Right Column: Form Content */}
          {/* Added padding directly here now */}
          <main className="md:col-span-9 lg:col-span-9 pt-2 pb-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8"> {/* Increased bottom margin */}
              <h2 className="text-xl font-semibold text-gray-100">
                Store Details
              </h2>
            </div>

            {/* NO background/padding/border/shadow on the form itself */}
            <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased spacing */}
              {/* Store Name */}
              <div>
                <label
                  htmlFor="storeName_seamless_v3" // Changed ID again for clarity
                  className="block text-sm font-medium text-gray-400 mb-1.5"
                >
                  Store Name <span className="text-red-500/80">*</span>
                </label>
                <input
                  type="text"
                  id="storeName_seamless_v3" // Changed ID again for clarity
                  name="storeName" // Must match key in StoreDetails state
                  value={storeDetails.storeName} // Assuming storeDetails state exists
                  onChange={handleInputChange} // Assuming handleInputChange function exists
                  required
                  className={
                    `w-full px-4 py-2.5 rounded-md shadow-sm ` +          // Base layout & shape
                    `bg-gray-950 text-gray-100 placeholder-gray-500 ` + // Colors: BG matches page, light text
                    `border border-gray-800 ` +                        // Default subtle dark gray border
                    `focus:outline-none focus:border-blue-500 ` +       // Remove outline, change border to blue on focus
                    `sm:text-sm transition duration-150 ease-in-out`   // Text size & transition
                  }
                  placeholder="Your unique store name"
                />
              </div>
              {/* Custom Domain */}
              <div>
                <label
                  htmlFor="customDomain_seamless_v3"
                  className="block text-sm font-medium text-gray-400 mb-1.5"
                >
                  Custom Domain (Optional)
                </label>
                <input
                  type="text"
                  id="customDomain_seamless_v3"
                  name="customDomain" // Must match key in StoreDetails state
                  value={storeDetails.customDomain} // Assuming storeDetails state exists
                  onChange={handleInputChange} // Assuming handleInputChange function exists
                  className={
                    `w-full px-4 py-2.5 rounded-md shadow-sm ` +          // Base layout & shape
                    `bg-gray-950 text-gray-100 placeholder-gray-500 ` + // Colors: BG matches page, light text
                    `border border-gray-800 ` +                        // Default subtle dark gray border
                    `focus:outline-none focus:border-blue-500 ` +       // Remove outline, change border to blue on focus
                    `sm:text-sm transition duration-150 ease-in-out`   // Text size & transition
                  }
                  placeholder="yourstore.com"
                />
                {/* Optional: Retain the helper text if needed */}
                <p className="mt-1.5 text-xs text-gray-500">
                  Fallback: <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-purple-300">{storeDetails.storeName?.toLowerCase().replace(/\s+/g, '-') || 'store-name'}.mydomain.com</code>
                </p>
              </div>

              {/* Store Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5"> Store Logo </label>
                <div className="mt-1 flex items-center space-x-4">
                  <span className="inline-block h-14 w-14 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 flex items-center justify-center">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
                    ) : (
                      <PhotoIcon className="h-7 w-7 text-gray-600" aria-hidden="true" />
                    )}
                  </span>
                  <label
                    htmlFor="storeLogoInput_seamless"
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-purple-500 transition duration-150"
                  >
                    {logoFile ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  <input
                    id="storeLogoInput_seamless"
                    name="storeLogo"
                    type="file"
                    className="sr-only"
                    onChange={handleLogoChange}
                    accept="image/png, image/jpeg, image/gif, image/webp"
                  />
                  {logoFile && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="p-1.5 text-gray-500 hover:text-red-500 transition duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-red-500"
                      title="Remove logo"
                    >
                      <XMarkIcon className="h-5 w-5" />
                      <span className="sr-only">Remove logo</span>
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 2MB.</p>
              </div>

              {/* Store Description */}
              <div>
                <label
                  htmlFor="storeDescription_seamless_v3"
                  className="block text-sm font-medium text-gray-400 mb-1.5"
                >
                  Store Description (Optional)
                </label>
                <textarea
                  id="storeDescription_seamless_v3"
                  name="storeDescription" // Must match key in StoreDetails state
                  rows={4} // Adjust number of rows as needed
                  value={storeDetails.storeDescription} // Assuming storeDetails state exists
                  onChange={handleInputChange} // Assuming handleInputChange function exists (works for textarea too)
                  className={
                    `w-full px-4 py-2.5 rounded-md shadow-sm ` +          // Base layout & shape
                    `bg-gray-950 text-gray-100 placeholder-gray-500 ` + // Colors: BG matches page, light text
                    `border border-gray-800 ` +                        // Default subtle dark gray border
                    `focus:outline-none focus:border-blue-500 ` +       // Remove outline, change border to blue on focus
                    `sm:text-sm transition duration-150 ease-in-out`   // Text size & transition
                  }
                  placeholder="A short description for your store (helps with SEO)..."
                />
              </div>

              {/* Action Button */}
              {/* Removed top border, relying on spacing */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-purple-500 transition duration-150 ease-in-out"
                >
                  Create
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StoreSetupSeamlessDark;
