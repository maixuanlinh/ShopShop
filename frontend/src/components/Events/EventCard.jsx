import React from 'react'
import styles from '../../styles/styles';

import Countdown from "./Countdown.jsx";

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12 ${active ? "unset" : "mb-12"}`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>

      <div className="w-full lg:-w[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256 gb</h2>
        <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>

        <div className='flex py-2 justify-between'>
            <div className='flex'>
                <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>1099</h5>
                <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>999</h5>

            </div>
            <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'></span>

        </div>
        <Countdown />
      </div>
    </div>
  );
}

export default EventCard