document.addEventListener('DOMContentLoaded', async function() {
  const customerActionsList = document.getElementById('customer-actions-list');

  // Add loader
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading...';
  customerActionsList.appendChild(loader);

  // Function to display customer actions
  function displayCustomerActions(actions) {
    const table = document.createElement('table');
    table.classList.add('customer-actions-table');

    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    ['Action', 'Description', 'Result'].forEach((text, index) => {
      const cell = headerRow.insertCell(index);
      cell.outerHTML = `<th>${text}</th>`;
    });

    const tbody = table.createTBody();
    actions.forEach(action => {
      const row = tbody.insertRow();
      row.insertCell(0).innerText = action.name;
      row.insertCell(1).innerText = action.description;
      const resultCell = row.insertCell(2);
      resultCell.innerText = action.result;
    });

    customerActionsList.appendChild(table);
  }

  // Function to display a message
  function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = message;
    customerActionsList.appendChild(messageDiv);
  }

  try {
    this.session = await recharge.auth.loginShopifyAppProxy();
    return this.session

    // Define the customer actions
    const customerActions = [
      {
        name: 'Get Customer',
        description: 'Retrieve a customer by ID.',
        result: JSON.stringify(await recharge.customer.getCustomer(this.session, customerId))
      },
      {
        name: 'List Customers',
        description: 'List all customers.',
        result: JSON.stringify(await recharge.customer.listCustomers(this.session))
      },
      {
        name: 'Create Customer',
        description: 'Create a new customer.',
        result: 'Example function call: await createCustomer(session, customerData)'
      },
      {
        name: 'Update Customer',
        description: 'Update an existing customer by ID.',
        result: 'Example function call: await updateCustomer(session, customerId, updateData)'
      },
      {
        name: 'Delete Customer',
        description: 'Delete a customer by ID.',
        result: 'Example function call: await deleteCustomer(session, customerId)'
      },
      {
        name: 'Get Credit Summary',
        description: 'Get the credit summary for a customer by ID.',
        result: JSON.stringify(await recharge.customer.getCreditSummary(this.session))
      }
    ];

    // Remove loader and display customer actions
    loader.remove();
    displayCustomerActions(customerActions);
  } catch (error) {
    console.error('Error fetching customer actions:', error);
    loader.remove();
    displayMessage('Error fetching customer actions.');
  }
});
