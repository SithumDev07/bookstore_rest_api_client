$(window).ready(async function () {
  let editMode = false;

  async function fetchMovies() {
    await fetch("http://localhost:9000/micro/resources/book/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0)
          populateBooks(
            document.getElementById("booksContainer"),
            data.filter((item) => item?.rating >= 3)
          );
      });
  }

  await fetchMovies();

  function populateBooks(element, books = []) {
    books.map((item) => {
      const divElement = document.createElement("div");
      divElement.classList.add(
        "book",
        "overflow-hidden",
        "grid",
        "place-items-center",
        "relative",
        "group"
      );
      const book = `
      
        <div class="relative rounded-xl overflow-hidden w-36 h-52 flex items-center justify-center">
          <img
            src="${item?.imageUrl}"
            alt="${item?.ISBN}"
            class="w-full h-full"
          />
          <div class="edit-mode-container absolute hidden z-10 top-0 left-0 right-0 bottom-0 w-full h-full backdrop-blur-sm bg-black/80 items-center justify-center">
        <button type="button" deleting="${item?.id}" class="text-red-500 delete-book">
          <i class="bi bi-dash-circle-fill text-3xl"></i>
        </button>
      </div>
        </div>
        <h4 class="text-base mt-3 text-center">
          ${item?.name}
        </h4>
        <p class="mt-2 text-xs text-booksy-secondary">${item?.author}</p>
        `;
      const starContainer = document.createElement("div");
      if (item.rating > 0) {
        starContainer.classList.add(
          "star-container",
          "flex",
          "items-center",
          "space-x-2",
          "mt-1",
          "text-booksy-gold"
        );
        let stars = "";
        let emptyStars = "";
        for (let i = 0; i < item.rating; i++) {
          stars += '<i class="bi bi-star-fill"></i>';
        }
        for (let i = 0; i < 5 - item.rating; i++) {
          emptyStars += '<i class="bi bi-star"></i>';
        }
        starContainer.innerHTML = stars + emptyStars;
      }
      divElement.innerHTML = book;
      divElement.appendChild(starContainer);
      element.appendChild(divElement);
    });
  }

  async function viewAll() {
    await fetch("http://localhost:9000/micro/resources/book/all", {
      headers: {
        "content-type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          populateBooks(document.getElementById("booksContainer"), data);
        }
      });
  }

  const viewAllButtons = [
    document.getElementById("viewAll"),
    document.getElementById("viewAllBanner"),
  ];

  viewAllButtons.forEach((item) => {
    item.addEventListener("click", async function () {
      document.getElementById("booksContainer").innerHTML = "";
      await viewAll();
      window.scrollTo({
        top:
          window.pageYOffset +
          document.getElementById("booksContainer").getBoundingClientRect().top,
        behavior: "smooth",
      });
    });
  });

  document
    .getElementById("editModeDropDown")
    .addEventListener("click", function () {
      document.getElementById("editMode").classList.toggle("hidden");
    });

  document
    .getElementById("editMode")
    .addEventListener("click", async function (e) {
      document.getElementById("editMode").classList.toggle("hidden");
      editMode = !editMode;
      console.log("Edit Mode ", editMode);
      document.getElementById("booksContainer").innerHTML = "";
      await fetchMovies();
      [...document.querySelectorAll(".edit-mode-container")].forEach((item) => {
        item.classList.toggle("hidden");
        item.classList.toggle("flex");
      });
    });

  async function removeBookById(id) {
    console.log(id);
    // await fetch("http://localhost:9000/micro/resources/book?id=" + id, {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   method: "DELETE",
    // }).then((response) => {
    //   if (response.status == 200) {
    //     window.location.reload();
    //   } else alert("Couldn't delete the book");
    // });
  }

  [...document.querySelectorAll(".delete-book")].forEach((item) => {
    console.log("Deleting");
    item.addEventListener("click", async function (e) {
      console.log(e.target.getAttribute("deleting"));
    });
  });
});
