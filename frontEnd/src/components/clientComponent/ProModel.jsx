import React from "react";

const ProductModal = ({ handlerClose }) => {
  return (
    <div className="relative z-50" role="dialog" aria-modal="true">
      <div
        onClick={handlerClose}
        className="fixed left-0 right-0 z-10 bottom-0 top-0 bg-gray-500 bg-opacity-75 transition-opacity block"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={handlerClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
                    alt="Two each of gray, white, and black shirts arranged on table."
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    Basic Tee 6-Pack
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">$192</p>

                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-900"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-900"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-900"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-900"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-200"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="sr-only">3.9 out of 5 stars</p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          117 reviews
                        </a>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-gray-900">
                          Color
                        </legend>

                        <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400">
                            <input
                              type="radio"
                              name="color-choice"
                              value="White"
                              className="sr-only"
                              aria-labelledby="color-choice-0-label"
                            />
                            <span id="color-choice-0-label" className="sr-only">
                              White
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-8 rounded-full bg-white border border-black border-opacity-10"
                            ></span>
                          </label>

                          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400">
                            <input
                              type="radio"
                              name="color-choice"
                              value="Gray"
                              className="sr-only"
                              aria-labelledby="color-choice-1-label"
                            />
                            <span id="color-choice-1-label" className="sr-only">
                              Gray
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-8 rounded-full bg-gray-200 border border-black border-opacity-10"
                            ></span>
                          </label>

                          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400">
                            <input
                              type="radio"
                              name="color-choice"
                              value="Black"
                              className="sr-only"
                              aria-labelledby="color-choice-2-label"
                            />
                            <span id="color-choice-2-label" className="sr-only">
                              Black
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-8 rounded-full bg-gray-900 border border-black border-opacity-10"
                            ></span>
                          </label>
                        </div>
                      </fieldset>

                      <fieldset className="mt-8">
                        <legend className="text-sm font-medium text-gray-900">
                          Size
                        </legend>

                        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-6">
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XXS"
                              className="sr-only"
                              aria-labelledby="size-choice-0-label"
                            />
                            <span id="size-choice-0-label">XXS</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XS"
                              className="sr-only"
                              aria-labelledby="size-choice-1-label"
                            />
                            <span id="size-choice-1-label">XS</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="S"
                              className="sr-only"
                              aria-labelledby="size-choice-2-label"
                            />
                            <span id="size-choice-2-label">S</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="M"
                              className="sr-only"
                              aria-labelledby="size-choice-3-label"
                            />
                            <span id="size-choice-3-label">M</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="L"
                              className="sr-only"
                              aria-labelledby="size-choice-4-label"
                            />
                            <span id="size-choice-4-label">L</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XL"
                              className="sr-only"
                              aria-labelledby="size-choice-5-label"
                            />
                            <span id="size-choice-5-label">XL</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="2XL"
                              className="sr-only"
                              aria-labelledby="size-choice-6-label"
                            />
                            <span id="size-choice-6-label">2XL</span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 border-gray-200">
                            <input
                              type="radio"
                              name="size-choice"
                              value="3XL"
                              className="sr-only"
                              aria-labelledby="size-choice-7-label"
                            />
                            <span id="size-choice-7-label">3XL</span>
                          </label>
                        </div>
                      </fieldset>

                      <button
                        type="submit"
                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
