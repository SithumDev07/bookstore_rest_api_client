$(window).ready(async function () {
  let editMode = false;

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

  function populateBooks(element, books = []) {
    books.map((item) => {
      const divElement = document.createElement("div");
      divElement.classList.add(
        "book",
        "overflow-hidden",
        "grid",
        "place-items-center",
        "relative"
      );
      const book = `
      <div class="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full bg-black/40 flex items-center justify-center">
        <button type="button" class="text-red-500">
          <i class="bi bi-dash-circle-fill"></i>
        </button>
      </div>
        <img
          src="${item?.imageUrl}"
          alt="${item?.ISBN}"
          class="rounded-xl w-auto h-52"
        />
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

  document.getElementById("editMode").addEventListener("click", function (e) {
    document.getElementById("editMode").classList.toggle("hidden");
    editMode = !editMode;
  });

  async function removeBookById(id) {
    await fetch("http://localhost:9000/micro/resources/book?id=" + id, {
      headers: {
        "content-type": "application/json",
      },
      method: "DELETE",
    }).then((response) => {
      if (response.status == 200) {
        window.location.reload();
      } else alert("Couldn't delete the book");
    });
  }
});
