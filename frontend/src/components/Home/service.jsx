import React from 'react'
import '../../styles/service.css'
import user from "../../assets/user-interface.png"
import { Link } from 'react-router-dom';

function service() {
  return (
    <div className='service'>
        <section id="services" class="services section-bg bg-aliceblue ">
    <div className="container" data-aos="fade-up">

      <div className="section-title">
        <h2 className='text-center pt-2'>About us</h2>
        <p className='px-3'>Here are some overview of our class project and theis</p>
      </div>
      <div className='project pl-5'>
         <div className="card shadow">
            <img src={user} class="card-img-top rounded mx-auto d-block" alt="mobile"></img>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/detail"> <button class="btn btn-outline-primary fw-bolder" type="submit">View</button></Link>
            </div>
        </div>
        <div className="card shadow ">
            <img src={user} class="card-img-top rounded mx-auto d-block" alt="mobile"></img>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/detail"> <button class="btn btn-outline-primary fw-bolder" type="submit">View</button></Link>
            </div>
        </div>
        <div className="card shadow ">
            <img src={user} class="card-img-top rounded mx-auto d-block" alt="mobile"></img>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/detail"> <button class="btn btn-outline-primary fw-bolder" type="submit">View</button></Link>
            </div>
        </div>
        
      </div>
     
    </div>

        
        </section>
  </div>
  )
}
export default service;
