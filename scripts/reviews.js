// Requirement 8: javascript event listener
window.addEventListener('load', () => {

    //Requirement 11: javascript class
    class reviewEntry {
        constructor(Title, Description, Rating, Restaurant) {
            this.Title = Title;
            this.Description = Description;
            this.Rating = Rating;
            this.Restaurant = Restaurant;
        }

        addReview() {
            this.Restaurant.parentNode.insertBefore(this.Title, this.Restaurant.nextSibling);
            this.Title.parentNode.insertBefore(this.Description, this.Title.nextSibling);
            this.Title.parentNode.insertBefore(this.Rating, this.Title.nextSibling);
        }
    }

    //Requirement 9: document.querySelector
    let main = document.querySelector('main');
    if (main.childElementCount === 1) {
        let emptyMessageHead = document.createElement('h3');
        emptyMessageHead.id = "emptyMessageHead";
        emptyMessageHead.innerHTML = 'You currently have no reviews';
        main.appendChild(emptyMessageHead);
        let emptyMessageP = document.createElement('p');
        emptyMessageP.id = "emptyMessageP";
        emptyMessageP.innerText = 'If you have used the restaurant review previously, please upload the file titled "info.txt".';
        emptyMessageP.innerText += '\nOtherwise, add your first review';
        main.appendChild(emptyMessageP);

        let input = document.createElement('input');
        input.id = "fileInput";
        input.type = 'file';
        input.accept = '.txt';
        main.appendChild(input);

        // Requirement 8: javascript event listener
        input.addEventListener('change', () => {
            let files = input.files;
            let fr = new FileReader;
            fr.onload = function (e) {
                main.innerHTML = e.target.result;
                generateRestaurantOptions();
            };
            fr.readAsText(files[0]);
        })
    }

    //Requirement 9:querySelector
    function removeFileUpload() {
        let emptyMessageHead = document.querySelector('#emptyMessageHead');
        if (emptyMessageHead !== null) {
            emptyMessageHead.remove();
            document.querySelector('#emptyMessageP').remove();
            document.querySelector('#fileInput').remove();
        }
    }

    //The following chunk of code I found help online and slightly modified the
    //original code to be better suited for my needs
    //source: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let saveReviews = document.querySelector('#saveReviews');
    let link = document.querySelector('#downloadLink');
    
    // Requirement 8: javascript event listener
    saveReviews.addEventListener('click', () => {
        link.href = makeTextFile(main.innerHTML);
        link.innerText = 'Download this file to the \"files\" folder of the directory of this site';
    })
    //End of chunk I needed help with


    let dropDown = document.querySelector('#restaurantDropdown');
    let defaultDropdownItem = dropDown.children[0];
    function generateRestaurantOptions() {
        {
            dropDown.innerHTML = "";
            dropDown.appendChild(defaultDropdownItem);
            let restaurants = document.querySelectorAll('.restaurant');
            for (let i = 0; i < restaurants.length; i++) {
                let thisRest = restaurants[i];
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.innerText = thisRest.innerText;
                dropDown.appendChild(newOption);
            }
        }
        removeFileUpload();
    }

    let submitReview = document.querySelector('#submit');
    
    // Requirement 8: javascript event listener
    submitReview.addEventListener("click", () => {
        let newMenuItem = document.querySelector('#order').value;
        let newDescription = document.querySelector('#description').value;
        let newRating = document.querySelector('#rating').value;

        let newEntryTitle = document.createElement('h4');
        newEntryTitle.innerText = newMenuItem;
        newEntryTitle.classList.add("entryItem");
        let newEntryDescr = document.createElement('p');
        newEntryDescr.classList.add('entryBody');
        newEntryDescr.innerText = "Description: " + newDescription;
        let newEntryRate = document.createElement('p');
        newEntryRate.classList.add('entryBody');
        newEntryRate.innerText = "Rating: " + newRating;

        let newEntryRestaurant;
        if (dropDown.value !== "") {
            newEntryRestaurant = document.querySelectorAll('.restaurant')[dropDown.value];
        } else {
            newEntryRestaurant = document.createElement('h3');
            newEntryRestaurant.innerText = document.querySelector('#restaurantText').value;
            newEntryRestaurant.classList.add('restaurant');
            main.appendChild(newEntryRestaurant);
        }

        //Requirement 11: javascript class ~ in use here
        let newEntry = new reviewEntry(newEntryTitle, newEntryDescr, newEntryRate, newEntryRestaurant);
        newEntry.addReview();

        document.querySelector('#order').value = null;
        document.querySelector('#description').value = null;
        document.querySelector('#rating').value = null;
        document.querySelector('#restaurantText').value = null;

        generateRestaurantOptions();
    })
})

//This chunk is part of the saving process for the part mentioned above
let reviewInfo = null;
function makeTextFile(text) {
    let data = new Blob([text], { text: 'text/plain' });

    if (reviewInfo !== null) {
        window.URL.revokeObjectURL(reviewInfo);
    }

    reviewInfo = window.URL.createObjectURL(data);
    console.dir(reviewInfo);

    return reviewInfo;
}
//End of chunk I needed help with

// Requirement 9: querySelector:
// There are 18 instances on this page of
//querySelector or querySelectorAll