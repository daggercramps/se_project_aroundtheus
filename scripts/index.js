//INITIAL CARDS//

    const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
        alt: "Yosemite Valley",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
        alt: "Lake Louise",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
        alt: "Bald Mountains",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
        alt: "Latemar",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
        alt: "Vanoise National Park",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
        alt: "Lago di Braies",
    },
    ];

//CONSTANTS//
   
    const profileEditForm = document.forms["profile-form"];
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const profileEditModalCloseBtn = document.querySelector("#profile-edit-modal-close-button");
    const profileEditModal = document.querySelector("#profile-edit-modal");
    const profileEditBtn = document.querySelector("#profile-edit-button");
    const profileTitleInput = document.querySelector("#profile-title-input");
    const profileDescriptionInput = document.querySelector("#profile-description-input");
    const profileNameInput = document.querySelector(".profile__name-url");
    const profileUrlInput = document.querySelector("#profile-url-input");
    const addCardFormElement = document.forms["card-form"];
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
    const cardsList = document.querySelector(".cards__list");
    const cardTitleInput = addCardFormElement.querySelector("#name-input");
    const cardUrlInput = addCardFormElement.querySelector("#url-input");
    const previewImageModal = document.querySelector("#preview-image-modal");
    const previewImage = document.querySelector(".preview__image");
    const previewTitle = document.querySelector(".modal__card-image-title");
    const imageCloseBtn = document.querySelector("#preview-image-close-button"); 
    const addBtn = document.querySelector("#add-button");
    const addModal = document.querySelector("#add-modal");
    const addModalCloseBtn = document.querySelector("#add-modal-close-button");
    const nameInput = document.querySelector("#name-input");
    const urlInput = document.querySelector("#url-input");
    const closeBtn = document.querySelectorAll(".modal__close");
    const formElement = document.querySelector(".modal__form");
    const buttonElement = document.querySelector(".modal__button");
    const cardLikeBtn = document.querySelector(".card__like-button");
    const cardDeleteBtn = document.querySelector(".card__delete-button");

//GET CARD ELEMENTS//

    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");

        cardTitle.textContent = cardData.name;
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;

        return cardElement;
    }

//TOGGLE SUBMIT BUTTON STATE//

    function toggleButtonState() {
        if (profileTitleInput.value.trim() === "" 
        || profileDescriptionInput.value.trim() === "" 
        || profileNameInput.value.trim() === "" 
        || !urlPattern.test(urlInput.value)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }

        profileTitleInput.addEventListener("input", toggleButtonState);
        profileDescriptionInput.addEventListener("input", toggleButtonState);
        profileNameInput.addEventListener("input", toggleButtonState);
        profileUrlInput.addEventListener("input", toggleButtonState);
    }

//RENDER CARD//

    function renderCard(cardData, wrapper) {
        const cardElement = getCardElement(cardData);
        wrapper.prepend(cardElement);
    }

//OPEN/CLOSE POPUP//

    function openPopup(popup) {
        popup.classList.add("modal_opened");
    }

    function closePopup(popup) {
        popup.classList.remove("modal_opened");
    }

//PROFILE EDIT SUBMIT//

    function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileTitle.textContent = profileTitleInput.value;
        profileDescription.textContent = profileDescriptionInput.value;
        closePopup(profileEditModal);
    }

    profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//PROFILE ADD SUBMIT//
    
    function handleAddCardFormElement(e) {
        e.preventDefault();
        const name = nameInput.value;
        const link = urlInput.value;
        renderCard({ name, link }, cardsList);
        closePopup(addModal);
        e.target.reset();
    }

    addCardFormElement.addEventListener("submit", handleAddCardFormElement);

//ADD BUTTON LISTENER//

    addBtn.addEventListener("click", () => {
        openPopup(addModal);
    });

    addModalCloseBtn.addEventListener("click", () => 
        closePopup(addModal));

//EDIT BUTTON LISTENER//

    profileEditBtn.addEventListener("click", () => {
        profileTitleInput.value = profileTitle.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
        openPopup(profileEditModal);
    });

    profileEditModalCloseBtn.addEventListener("click", () => 
        closePopup(profileEditModal));
    
//PREVIEW IMAGE CLOSE BUTTON//

    imageCloseBtn.addEventListener("click", () => {
        closePopup(previewImageModal);
    });

//CLOSE BUTTON LISTENER//

    closeBtn.forEach((button) => {
        const popup = button.closest(".modal");
        button.addEventListener('click', () => closePopup(popup));
    });

//INITIAL RENDER//

    initialCards.forEach((cardData) => {
        const cardElement = getCardElement(cardData);
        cardsList.prepend(cardElement);
    });