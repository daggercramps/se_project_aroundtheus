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
    
    const profileEditBtn = document.querySelector("#profile-edit-button");
    const profileAddBtn = document.querySelector("#add-button");
    const profileEditModal = document.querySelector("#profile-edit-modal");
    const profileAddModal = document.querySelector("#add-modal");
    const profileEditModalCloseBtn = document.querySelector("#profile-edit-modal-close-button");
    const profileAddModalCloseBtn = document.querySelector("#add-modal-close-button");
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const profileTitleInput = document.querySelector("#profile-title-input");
    const profileDescriptionInput = document.querySelector("#profile-description-input");
    const profileNameInput = document.querySelector("#profile-name-input");
    const profileUrlInput = document.querySelector("#profile-url-input");
    const profileEditForm = document.forms["profile-form"];
    const addCardFormElement = document.forms["card-form"];
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
    const cardsList = document.querySelector(".cards__list");
    const cardTitleInput = addCardFormElement.querySelector("#profile-name-input");
    const cardUrlInput = addCardFormElement.querySelector("#profile-url-input");
    const previewImageModal = document.querySelector("#preview-image-modal");
    const previewImage = document.querySelector(".preview__image");
    const previewTitle = document.querySelector(".modal__card-image-title");
    const imageCloseBtn = document.querySelector("#preview-image-close-button");
    
    function closePopup(popup) {
        popup.classList.remove("modal_opened");
    }

    function openPopup(popup) {
        popup.classList.add("modal_opened");
    }

    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");
        const cardLikeBtn = cardElement.querySelector(".card__like-button");
        const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

        cardLikeBtn.addEventListener("click", () => {
            cardLikeBtn.classList.toggle("card__like-button_active");
        });

        cardDeleteBtn.addEventListener("click", () => 
            cardElement.remove());

        cardImage.addEventListener("click", () => {
            previewImage.src = cardData.link;
            previewImage.alt = cardData.name;
            previewTitle.textContent = cardData.name;
            previewImageModal.classList.add("modal_opened");
        });
        /*I didn't understand the comment about 
        how the close icons should be handled once*/
        imageCloseBtn.addEventListener("click", () => {
            closePopup(previewImageModal);
        })

        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;
        cardTitle.textContent = cardData.name;

        return cardElement;
    }

    function renderCard(cardData, wrapper) {
        const cardElement = getCardElement(cardData);
        wrapper.prepend(cardElement);
    }
    
    function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileTitle.textContent = profileTitleInput.value;
        profileDescription.textContent = profileDescriptionInput.value;
        closePopup(profileEditModal);
    }
    
    function handleAddCardFormElement(e) {
        e.preventDefault();
        const name = profileNameInput.value;
        const link = profileUrlInput.value;
        renderCard({ name, link }, cardsList);
        closePopup(profileAddModal);
        e.target.reset();
    }
    
    profileEditForm.addEventListener("submit", handleProfileEditSubmit);
    addCardFormElement.addEventListener("submit", handleAddCardFormElement);
    
    profileEditBtn.addEventListener("click", () => {
        profileTitleInput.value = profileTitle.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
        profileEditModal.classList.add("modal_opened");
    });
    
    profileAddBtn.addEventListener("click", () => {
        profileAddModal.classList.add("modal_opened");
    });
    
    profileEditModalCloseBtn.addEventListener("click", () => 
        closePopup(profileEditModal));
    
    profileAddModalCloseBtn.addEventListener("click", () => 
        closePopup(profileAddModal));
    
    initialCards.forEach((cardData) => {
        const cardElement = getCardElement(cardData);
        cardsList.prepend(cardElement);
    });