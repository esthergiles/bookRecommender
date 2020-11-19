/******************************************
 scripts.js
 modeled from: https://www.learnwithjason.dev/blog/get-form-values-as-json/
 Note: We skipped step 5 because we opted to not seperate data out into arrays,
        ideally we would seperate everything out
*****************************************/
//Checks if checkbox or radio is selected
const isValidValue = element => {
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
  };

//Checks if element is empty
const isValidElement = element => {
    return element.name && element.value;
  };

//Function that handles default
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    // Make sure the element is checked or has input
    if (isValidElement(element)&& isValidValue(element)) {
      data[element.name] = element.value;
    }
    return data;
  }, {}); 


  const handleFormSubmit = event => {
    // Stop the form from submitting since we’re handling that with AJAX.
    event.preventDefault();
    // Call our function to get the form data.
    const data = formToJSON(form.elements);
    // Demo only: print the form data onscreen as a formatted JSON object.
    const dataContainer = document.getElementsByClassName('results__display')[0];
    // Use `JSON.stringify()` to make the output valid, human-readable JSON.
    dataContainer.textContent = JSON.stringify(data, null, "  ");
    // ...this is where we’d actually do something with the form data...
  };


  //Function that grabs form data
  const form = document.getElementsByClassName('form')[0];
  form.addEventListener('submit', handleFormSubmit);

  //Reducer Function to combine form elements into a single object
  const formToJSON_deconstructed = elements => {
    // This is the function that is called on each element of the array.
    const reducerFunction = (data, element) => {
      // Add the current field to the object.
      data[element.name] = element.value;
      // For the demo only: show each step in the reducer’s progress.
      console.log(JSON.stringify(data));
      return data;
    };


    // This is used as the initial value of `data` in `reducerFunction()`.
    const reducerInitialValue = {};
    // To help visualize what happens, log the inital value.
    console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));
    // Now we reduce by `call`-ing `Array.prototype.reduce()` on `elements`.
    const formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);
    // The result is then returned for use elsewhere.
    return formData;
  };