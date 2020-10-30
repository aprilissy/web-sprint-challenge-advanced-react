import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  //Arrange
  render(<CheckoutForm />)

  //Act
  //does the element exist?
  const h2 = screen.getByTestId('h2')
 
  //does the correct info display
  const h2Message = screen.getByText(/checkout form/i)
 
  // practicing different ways to access info
  const h2Take2 = screen.getByRole('heading')
  

  //Assert
  //does the element exist?
  expect(h2).toBeTruthy()

  //does the correct info display
  expect(h2Message).toBeTruthy()

   // practice different expect
   expect(h2Message).not.toBeFalsy()

   // practicing different ways to access info
   expect(h2Take2).toBeTruthy()

});

test("form shows success message on submit with form details", async () => {
  //Arrange: render the component
  render(<CheckoutForm />)

  //Act
  //1. get access to each form field
  const firstNameInput = screen.getByLabelText(/first name/i)
  const lastNameInput = screen.getByLabelText(/last name/i)
  const addressInput = screen.getByLabelText(/address/i)
  const cityInput = screen.getByLabelText(/city/i)
  const stateInput = screen.getByLabelText(/state/i)
  const zipCodeInput = screen.getByLabelText(/zip/i)
  
  //2. add text to our fields (fill them out)
  fireEvent.change(firstNameInput, {target:{value:'April',name:'firstName'}})
  fireEvent.change(lastNameInput, {target:{value:'Darger',name:'lastName'}})
  fireEvent.change(addressInput, {target:{value:'123 Alpahabet',name:'address'}})
  fireEvent.change(cityInput, {target:{value:'Open',name:'city'}})
  fireEvent.change(stateInput, {target:{value:'TheDoor',name:'state'}})
  fireEvent.change(zipCodeInput, {target:{value:'abc35',name:'zip'}})

  //3. get access to and click checkout button
  const button = screen.getByRole('button')
  fireEvent.click(button)

  //Assert
  await waitFor(() => {
    const successMessageP1 = screen.getByText(/you have ordered some plants! woo-hoo!/i)
    expect(successMessageP1).toBeTruthy()
    const successMessageP2 = screen.getByText(/your new green friends will be shipped to:/i)
    expect(successMessageP2).toBeTruthy()
    const successMessageFirstName = screen.getByText(/april/i)
    expect(successMessageFirstName).toBeTruthy()

    const successMessageLastName = screen.getByText(/darger/i)
    expect(successMessageLastName).toBeTruthy()

    const successMessageAddress = screen.getByText(/123 Alpahabet/i)
    expect(successMessageAddress).toBeTruthy()

    const successMessageCity = screen.getByText(/Open/i)
    expect(successMessageCity).toBeTruthy()

    const successMessageState = screen.getByText(/TheDoor/i)
    expect(successMessageState).toBeTruthy()

    const successMessageZip = screen.getByText(/abc35/i)
    expect(successMessageZip).toBeTruthy()
  })
});
