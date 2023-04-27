document.addEventListener('DOMContentLoaded', () => {
  const addFoodBtn = document.getElementById('add-food-btn');
  const addFoodModal = document.getElementById('add-food-modal');
  const addFoodForm = document.getElementById('add-food-form');
  const deleteFoodBtn = document.getElementById('delete-food-modal-btn');
  const foodList = document.getElementById('food-list');
  const editCaloriesBtn = document.getElementById('edit-calories-btn');
  const caloriesCurrentValue = document.getElementById('calories-current-value');
  const caloriesTargetValue = document.getElementById('calories-target-value');
  const editProteinBtn = document.getElementById('edit-protein-btn');
  const proteinCurrentValue = document.getElementById('protein-current-value');
  const proteinTargetValue = document.getElementById('protein-target-value');
  const foodCaloriesInput = document.getElementById('food-calories');
  const foodProteinInput = document.getElementById('food-protein');
  const foodListContainer = document.getElementById('food-list');
  const addOrUpdateFoodBtn = document.getElementById('add-food-modal-btn');
  const addTimeBtn = document.getElementById("add-time-btn");
  const addTimeModal = document.getElementById("add-time-modal");
  const addTimeModalBtn = document.getElementById("add-time-modal-btn");
  const deleteTimeModalBtn = document.getElementById("delete-time-modal-btn");
  const timeNameInput = document.getElementById("time-name");
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');
  const switchToSignupBtn = document.getElementById('switch-to-signup-btn');
  const switchToLoginBtn = document.getElementById('switch-to-login-btn');
  var closeButtons = document.querySelectorAll('.close-btn');
  let editingFoodItem = null;
  let editingFoodItemId;




  // Drag & Drop
  new Sortable(foodListContainer, {
    animation: 150,
    delay: 200, // Increase the delay before dragging starts
    delayOnTouchOnly: true,
    touchStartThreshold: 3,
    onStart: function (evt) {
      evt.item.classList.add("dragging"); // Add 'dragging' class to the dragged item
    },
    onEnd: function (evt) {
      evt.item.classList.remove("dragging"); // Remove 'dragging' class from the item
    },
  });
  

  // stocal storeage
  localStorage.setItem('username', 'johndoe');
  const username = localStorage.getItem('username');
console.log(username); // Output: "johndoe"
localStorage.removeItem('username');



switchToSignupBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
});

switchToLoginBtn.addEventListener('click', () => {
  signupModal.style.display = 'none';
  loginModal.style.display = 'block';
});

// Close Modal "X" button functionality
var closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    var modal = closeBtn.closest('.modal');
    closeModal(modal);
  });
});

// Close the modal when the user clicks outside the modal content
var modals = document.querySelectorAll('.modal-overlay');
modals.forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Function to close a modal
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  updateModalOpenButtons();
}



// Login & Sign Up SECTION 1 END



  
// SECTION TIME WORKING ON
addTimeModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (currentlyEditing) {
    currentlyEditing.textContent = timeNameInput.value;
    currentlyEditing = null;
  } else {
    addMeal(timeNameInput.value);
  }
  timeNameInput.value = "";
  addTimeModal.style.display = "none";
  document.body.classList.remove('modal-open');
  updateModalOpenButtons();
});

deleteTimeModalBtn.addEventListener("click", () => {
  if (currentlyEditing) {
    foodList.removeChild(currentlyEditing);
    currentlyEditing = null;
  }
  addTimeModal.style.display = "none";
  document.body.classList.remove('modal-open');
  updateModalOpenButtons();
});
// SECTION TIME WORKING ON END

addOrUpdateFoodBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (editingFoodItem) {
    editingFoodItem.querySelector('.food-name').textContent = foodNameInput.value;
    editingFoodItem.querySelector('.green-box').textContent = foodCaloriesInput.value;
    editingFoodItem.querySelector('.red-box').textContent = foodProteinInput.value;
    editingFoodItem = null;
  } else {
    addFood(foodNameInput.value, foodCaloriesInput.value, foodProteinInput.value);
  }
  foodNameInput.value = "";
  foodCaloriesInput.value = "";
  foodProteinInput.value = "";
  addFoodModal.style.display = "none";
  document.body.classList.remove('modal-open');
  updateModalOpenButtons();
});

deleteFoodBtn.addEventListener("click", () => {
  if (editingFoodItem) {
    foodList.removeChild(editingFoodItem);
    editingFoodItem = null;
  }
  addFoodModal.style.display = "none";
  document.body.classList.remove('modal-open');
  updateModalOpenButtons();
});



window.addEventListener("click", (event) => {
  if (event.target === addTimeModal) {
    addTimeModal.style.display = "none";
  }
});
 // Time Section end 1

 foodCaloriesInput.addEventListener('input', updateCaloriesCurrentValue);
 foodProteinInput.addEventListener('input', updateProteinCurrentValue);
 

 deleteFoodBtn.addEventListener('click', () => {
  const foodItemToRemove = foodList.querySelector(`[data-id="${editingFoodItemId}"]`);
  if (foodItemToRemove) {
    foodList.removeChild(foodItemToRemove);
  }
  closeModal(deleteFoodModal);
});



// SECTION - Stop users from opening multily modals.
// Function to open a modal
// Add event listeners to your modal open buttons
var modalOpenButtons = document.querySelectorAll('.modal-open-btn');
modalOpenButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var targetModalId = btn.getAttribute('data-target-modal');
    var targetModal = document.getElementById(targetModalId);
    openModal(targetModal);
  });
});

// Function to open a modal
function openModal(modal) {
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
  updateModalOpenButtons();
}

// Function to enable/disable modal open buttons based on whether a modal is open or not
function updateModalOpenButtons() {
  var modalOpenButtons = document.querySelectorAll('.modal-open-btn');
  var isModalOpen = document.body.classList.contains('modal-open');
  modalOpenButtons.forEach(function (btn) {
    btn.disabled = isModalOpen;
  });
}

// SECTION END - Stop users from opening multily modals.


  function updateCaloriesCurrentValue() {
    if (editingFoodItem) {
      const oldFoodCalories = parseInt(editingFoodItem.querySelector('.green-box').textContent);
      const newFoodCalories = foodCaloriesInput.value ? parseInt(foodCaloriesInput.value) : 0;
  
      const counter = parseInt(editingFoodItem.querySelector('.counter').textContent);
      const caloriesDifference = (oldFoodCalories - newFoodCalories) * counter;
  
      const currentCaloriesValue = parseInt(caloriesCurrentValue.textContent);
      caloriesCurrentValue.textContent = currentCaloriesValue + caloriesDifference;
  
      // Update the food item's calories value in the list
      editingFoodItem.querySelector('.green-box').textContent = newFoodCalories;
    }
  }
  

  function updateProteinCurrentValue() {
    if (editingFoodItem) {
      const oldFoodProtein = parseInt(editingFoodItem.querySelector('.red-box').textContent);
      const newFoodProtein = foodProteinInput.value ? parseInt(foodProteinInput.value) : 0;
  
      const counter = parseInt(editingFoodItem.querySelector('.counter').textContent);
      const proteinDifference = (oldFoodProtein - newFoodProtein) * counter;
  
      const currentProteinValue = parseInt(proteinCurrentValue.textContent);
      proteinCurrentValue.textContent = currentProteinValue + proteinDifference;
  
      // Update the food item's protein value in the list
      editingFoodItem.querySelector('.red-box').textContent = newFoodProtein;
    }
  }
  
  

  function makeEditable(editButton, currentValueElement, targetValueElement, calculateTotal) {
    editButton.addEventListener('mousedown', (event) => {
      event.preventDefault(); // Prevents losing focus on the "+" button
      targetValueElement.setAttribute('contenteditable', 'true');
      targetValueElement.focus();
    });
  
    targetValueElement.addEventListener('focusout', () => {
      targetValueElement.setAttribute('contenteditable', 'false');
      if (calculateTotal) {
        currentValueElement.textContent = calculateTotal();
      } else {
        currentValueElement.textContent = targetValueElement.textContent;
      }
      // Save the updated value here (if needed)
    });
  }

  function calculateTotalCalories() {
    const targetCalories = parseInt(caloriesTargetValue.textContent);
    let sumOfFoodCalories = 0;
    const foodItems = foodList.querySelectorAll('.food-item');
    foodItems.forEach((foodItem) => {
      const calories = parseInt(foodItem.querySelector('.green-box').textContent);
      sumOfFoodCalories += calories;
    });
    return targetCalories - sumOfFoodCalories;
  }
  
  
  function calculateTotalProtein() {
    const targetProtein = parseInt(proteinTargetValue.textContent);
    let sumOfFoodProtein = 0;
    const foodItems = foodList.querySelectorAll('.food-item');
    foodItems.forEach((foodItem) => {
      const protein = parseInt(foodItem.querySelector('.red-box').textContent);
      sumOfFoodProtein += protein;
    });
    return targetProtein - sumOfFoodProtein;
  }
  
  
  
  
  const caloriesBox = document.getElementById('calories-box');
  const proteinBox = document.getElementById('protein-box');




  
// Add event listener to enable editing on click
caloriesTargetValue.addEventListener('click', (event) => {
  // Enable editing when user clicks on element
  caloriesTargetValue.contentEditable = 'true';
  // Highlight the full value for easy editing
  window.getSelection().selectAllChildren(caloriesTargetValue);
});


// SECTION - Editing the Target Values. So you Add event listener to enable editing on click
// NEW - Event listener to enable editing on click
caloriesTargetValue.addEventListener('click', (event) => {
  // Enable editing when user clicks on element
  caloriesTargetValue.contentEditable = 'true';
  // Highlight the full value for easy editing
  window.getSelection().selectAllChildren(caloriesTargetValue);
});

// Event listener to detect "Enter" key press
caloriesTargetValue.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    caloriesTargetValue.contentEditable = 'false';
    window.getSelection().removeAllRanges();
  }
});

// Do the same for proteinTargetValue
proteinTargetValue.addEventListener('click', (event) => {
  proteinTargetValue.contentEditable = 'true';
  window.getSelection().selectAllChildren(proteinTargetValue);
});

proteinTargetValue.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    proteinTargetValue.contentEditable = 'false';
    window.getSelection().removeAllRanges();
  }
});
  // SECTION END - Editing the Target Values. So you Add event listener to enable editing on click

makeEditable(caloriesBox, caloriesCurrentValue, caloriesTargetValue, calculateTotalCalories);
makeEditable(proteinBox, proteinCurrentValue, proteinTargetValue, calculateTotalProtein);


  

  function createFoodItem(foodName, foodCalories, foodProtein, initialCounterValue = 0) {
    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
  
    foodItem.innerHTML = `
    <span>${foodName}</span>
    <div>
      <span class="green-box">${foodCalories}</span>
      <span class="red-box">${foodProtein}</span>
    </div>
  `;
  
    

    // To click the food name to edit it
const foodNameElement = foodItem.querySelector('span:first-of-type');
foodItem.addEventListener("click", () => {
  // Open the modal
  addFoodModal.style.display = "block";

  // Update the foodName, foodCalories, and foodProtein values
  foodName = foodItem.querySelector('span:first-of-type').textContent;
  foodCalories = foodItem.querySelector('.green-box').textContent;
  foodProtein = foodItem.querySelector('.red-box').textContent;

  // Fill in the form with the food item's current data
  document.getElementById("food-name").value = foodName;
  document.getElementById("food-calories").value = foodCalories;
  document.getElementById("food-protein").value = foodProtein;
  editingFoodItem = foodItem;
  addOrUpdateFoodBtn.textContent = "Update";
});


    return foodItem;
  }

  addFoodForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const newFoodName = document.getElementById('food-name').value;
    const newFoodCalories = document.getElementById('food-calories').value;
    const newFoodProtein = document.getElementById('food-protein').value;
  
    if (editingFoodItem) {
      // Get the old values of calories and protein
      const oldFoodCalories = parseInt(editingFoodItem.querySelector('.green-box').textContent);
      const oldFoodProtein = parseInt(editingFoodItem.querySelector('.red-box').textContent);
  
      // Update the existing food item
      editingFoodItem.querySelector('span:first-of-type').textContent = newFoodName;
      editingFoodItem.querySelector('.green-box').textContent = newFoodCalories;
      editingFoodItem.querySelector('.red-box').textContent = newFoodProtein;
  
      // Calculate the differences in calories and protein
      const caloriesDifference = oldFoodCalories - newFoodCalories;
      const proteinDifference = oldFoodProtein - newFoodProtein;
  
      // Update the current values of calories and protein
      const currentCaloriesValue = parseInt(caloriesCurrentValue.textContent);
      caloriesCurrentValue.textContent = currentCaloriesValue + caloriesDifference;
      const currentProteinValue = parseInt(proteinCurrentValue.textContent);
      proteinCurrentValue.textContent = currentProteinValue + proteinDifference;
    } else {
      // Create and append a new food item
      const foodItem = createFoodItem(newFoodName, newFoodCalories, newFoodProtein);
      foodList.appendChild(foodItem);
  
      // Update the current values of calories and protein
      const currentCaloriesValue = parseInt(caloriesCurrentValue.textContent);
      caloriesCurrentValue.textContent = currentCaloriesValue - newFoodCalories;
      const currentProteinValue = parseInt(proteinCurrentValue.textContent);
      proteinCurrentValue.textContent = currentProteinValue - newFoodProtein;
    }
  
    // Clear the form and close the modal
    addFoodForm.reset();
    addFoodModal.style.display = 'none';
    editingFoodItem = null;
    addOrUpdateFoodBtn.textContent = "Add";
  });
  

  function addMeal(timeName) {
    const mealItem = document.createElement("div");
    mealItem.classList.add("food-item-time");
    mealItem.textContent = timeName;

    mealItem.setAttribute("draggable", "true");
    mealItem.addEventListener("dragstart", dragStart);
    mealItem.addEventListener("dragover", dragOver);
    mealItem.addEventListener("dragleave", dragLeave);
    mealItem.addEventListener("drop", drop);
    mealItem.addEventListener("dragend", dragEnd);

    mealItem.addEventListener("click", () => {
      editMeal(mealItem);
    });

    foodList.appendChild(mealItem);
  }

   // Time Section 2
  let currentlyEditing = null;

  function editMeal(mealItem) {
    currentlyEditing = mealItem;
    timeNameInput.value = mealItem.textContent;
    addTimeModalBtn.textContent = "Update"; // Set the button text to "Update"
    addTimeModal.style.display = "block";
  }

  function dragStart(e) {
    e.target.classList.add("dragging");
  }

  function dragOver(e) {
    e.preventDefault();
    if (!e.target.classList.contains("food-item-time")) return;
    e.target.classList.add("drag-over");
  }

  function dragLeave(e) {
    if (!e.target.classList.contains("food-item-time")) return;
    e.target.classList.remove("drag-over");
  }

  function drop(e) {
    e.preventDefault();
    if (!e.target.classList.contains("food-item-time")) return;
    const draggingElement = document.querySelector(".dragging");
    const targetElement = e.target;
  
    const draggingElementRect = draggingElement.getBoundingClientRect();
    const targetElementRect = targetElement.getBoundingClientRect();
    const referenceElement = draggingElementRect.y < targetElementRect.y ? targetElement.nextSibling : targetElement;
    foodList.insertBefore(draggingElement, referenceElement);
    targetElement.classList.remove("drag-over");
  }
  

  function dragEnd(e) {
    e.target.classList.remove("dragging");
  }

// Add these helper functions at the bottom of your app.js file:
let foodItemId = 0;
function addFood(name, calories, protein) {
  const foodItem = document.createElement('div');
  foodItem.className = 'food-item';
  foodItem.dataset.id = foodItemId++;
  foodItem.innerHTML = `
    <p class="food-name">${name}</p>
    <p class="green-box">${calories}</p>
    <p class="red-box">${protein}</p>
  `;
  foodItem.addEventListener('click', () => {
    editingFoodItemId = foodItem.dataset.id;
    editingFoodItem = foodItem;
    foodNameInput.value = foodItem.querySelector('.food-name').textContent;
    foodCaloriesInput.value = foodItem.querySelector('.green-box').textContent;
    foodProteinInput.value = foodItem.querySelector('.red-box').textContent;
    addFoodModal.style.display = 'block';
  });
  foodList.appendChild(foodItem);
}

 // Time section 2 end

});