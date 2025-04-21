import styles from './Landing.module.css';
import Stars from '../../assets/images/stars.jpg';
import Logotype from '../../assets/images/logo.jpg';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
          <img src={Logotype} alt='A cute owl' />
        </section>

        <section className={styles.about}>
          <header>
            <h3>WHY MAKE REVIEWS HERE?</h3>
            <h1>ABOUT US</h1>
          </header>
          <article>
            <p>
              Not everyone makes purchases at Walmart or Amazon. That's why we're
              building the Peoples Review, an open and inclusive place for shoppers
              to share their products, and their honest and open opinion about them.
              We provide a platform and the people share their purchases without
              having to log in to numerous e-commerce sites.  All the reviews in one
              place is the Peoples Review.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>WHY MAKE REVIEWS HERE?</h3>
            <h1>TESTIMONIALS</h1>
          </header>
          <article>
            <header>
              <h4>Jerry Spann</h4>
              <p>Software Engineer</p>
            </header>
            <p>
              I found the Peoples Review through a friend of mine, and I'm so 
              glad I did. As a consumer that shops at my local businesses, I 
              can not leave reviews for products on Amazon or other online retailers.
              Writing reviews on the Peoples Review is easy and convenient.
            </p>
            <footer>
              <img src={Stars} alt='a loaf of bread' />
            </footer>
          </article>
        </section>

      </main>

      <footer className={styles.footer}>
        © 2025 THE PEOPLES REVIEW
      </footer>
    </>
  );
};

export default Landing;
