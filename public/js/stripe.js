import { showAlert } from "./alerts.js";

const stripe = Stripe(
  "pk_test_51OBD6uSFGfA43gJJXTpguTg60AYD5HChmnNV1L1MZA01jxbRPvCJuBcvB7f3fkqart20Jvmg5IEQJb1gIQiCNGwO00qulqCnoS"
);

const bookbtn = document.getElementById("book-tour");

const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    // 3) Create session as response
  } catch (err) {
    showAlert("error", err);
  }
};

if (bookbtn) {
  bookbtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    e.preventDefault();
    bookTour(tourId);
  });
}
