import { useNavigate } from "react-router-dom";

import { IoBagHandle } from "react-icons/io5";

import About from "./components/About";
import Carrossel from "./components/carrossel";
import logo from "../../assets/6Uu1ixeg.png";
import WhoWeAre from './components/whoWeAre';

const slides = [
  "https://uca04d7de3a788a6c7716ebc8562.previews.dropboxusercontent.com/p/thumb/ACtVUPRTTw0XNsSeNluXqAK4Rj7lCIHxTfdGSHnROOweUFJKsKMAVjvNqXJHqDEprGyLVJysq4e4ZnKdl9JeLCpMYvfm21BgDnf6uUAZ-7wbmPC02Jons454TqxVPOfpJJMVEO0Wp53XsgdMVrq7LOeUcJ7M6AUITmAmSA3B8VfgUxUWHjPKysi13qLXrCu3JktZYaDpJDIT8fnZdMLyVpKBtzwfZD8xXVd-y0RX7Suj43MipQtdZs3MDcgPlwTTHJJ91g3G4lenMMDqWfWLubgU09ZGnNH0wDXtup0vohgZYjkQxYvQTWwI73LsnG0Mze2Plwd8qufwsH4f8zVW2edBixEHZyVuRMErwRHkG50nMNguYEEE0v6waygHZ4MJ22VWbPkqiDmV9V6AiBpeSZfSmgWtq2OU-9PzTDbp3dICBj6tKo2puAVsPD-VmxNQArGSykFca7dx_gWccuT8P4nEAxMRkDdSIoXxI7vUlMG32mdwhoRzMiYjZOqkh3ye5rsdYA99sPwKYSJ-2Z8mf-9-GI48Ts4ShrV3NeSDJ4IUKw/p.png",
  "https://uc52ec4204d6d3fd81313238bab4.previews.dropboxusercontent.com/p/thumb/ACvD_8WFydkywBnyIbXMLRYrsqHs_ktNBogYkUPRPGKmdmYabWyGJ7d7V_nVGx5pN3lhcJKJT6l3GuZDjQLOk6nCfFrjE3HNf6jZq5RTZhDxRpQQ3ioXIGJCtjgHkjlQjTdDgmrIWagS1mThVB3FUAJZP_r9uFvSHiTHUM_w8ppR6R275CF_hTFOEXAHksS1pbGIuFrzjy1ft8EPFr3NXQXxQa4RUybjy0bJ3bQHzrWVDqiUe_IHKUZqH1p3_oPMA1Y-nJKDvF2FX2-OKZ3aOwwtmbx_teyMwjnyNxnNxlsfmWfuiOav_Q6gMxVKQ9cciRdpfILr28AEVHZX1xrY1iCFDFeVv7J-jnu007JwqFshRFuhtGHpB5_tf_UFPjXqVCBFeZGiEeCCvPw7fcXtlkzcVqib67xJdk4MkC0TA_B5CCP9_bhMBxTbUVP_SMRzZfUoUEDA95uj-WMLm17FQ9ZH0D-gNwVkIX6gqCwtmb4_ZA/p.png",
  "https://uc7f6661014052a2a918e83c0b89.previews.dropboxusercontent.com/p/thumb/ACsyGzqUSZLpXSdzEqsCxh_K7-klXvxMDTukJCXV3neEFIElQQE4ojcvTyZFIWlIHgYDAVXw9d-k_79EOEAtVdnaohn53qN1uFh1PmdJ2120sPfrbOGskKwN4KrWFglMZy4U1jPV5bvgHPhJUPCcRVKSbFga-pZHHxIDcdQSWr2cR5TZgpgiMv8JBgfjGovyk62nUN6plTLeXs0rexlyVLwuMuw49paydJzuzAvJn1xKDi5-IJgi4tzO1uwGlj4C-sAd8TrNJeLJ8WGjFNWPcEy8d9znLTpzo-Yx81ZgrahebNrUYVaceHxMekYOOHMkF239Ersv39U5xv8ZrxF1kf_ETO67ODQaJkES84iX8NxMGz9OaXZn_vPIWQo4v4NC2mjG0UzwSKq7pC0uZZoUgZxMmovexZLEW4y0BDxrLOqWHw/p.jpeg",
  "https://uc22c10b7bff9d147aa2a706cdea.previews.dropboxusercontent.com/p/thumb/ACt5aZWXYmmY-wDPCwh9eaTxnYTVIBHgDVzP_JqnfNoxvoBGsNISb6_7N_fRznTQaBRiPFTK9H6NfxFnyctsFocHOn0nmiQjxxH6_8IuFTyGf8EZVWQg2X5QlPRpcn9JvX8Ktol8llXomVLcgq0Q6s3eU9_kQn4Svb4n7-lA7YU_UhU3q5SO6Ti58i7AGZvfrUg3J3yHmLExyXZajMzcMbtcFQWNi_RjEwt3zTZaZwWBOPIhqRgbdhQZe7l9H0WosWJsml-gX_6XNYNub_Ps_1h_jQKfbIMyKlFXT1Vt-9m4mnziTWR6x4qqZUb4HDDxqKZWK7TeFO_bdsBiwwysp1Vn6TzX50d_8vrrPRX1Ty9WMQ/p.jpeg",
  "https://uc2910d4bf29175914aaeafe1f74.previews.dropboxusercontent.com/p/thumb/ACvwDhvyZ46z0l0DSOlZB7VxU5t3w1r3X7WvM9En6cPbAA_D_ys5k4mMhuHme9nSUkHABjQWRwNJkUxSi_sKBSJG-QW01FIntNi5XycIXbYNMbV2h9xvl7PIHY379zskJBo1tYI5dtWkZesqG1A5LLISTaEXDWNgAKm30D00B43nq3XR8VDFLv7b3IC0o6Iwk2MkDcyvzL3k2raE3eeZValyhWC7kgvzO5MJhxJQvG2ubSk6xpSxsIyoyZ5odEF6XwLJMEwCsMCC4x7-SgYqfiIRzow8V8HaXGwW7P8I-6XoyC-1ilvmxDMdeOgiJWTmKLUKOQ5Z0xRSlay7aque7ynwkBYdbYDyWocDaGNMWhRCiw/p.png",
  "https://uc9a11d7f22d46be2e7d870147f5.previews.dropboxusercontent.com/p/thumb/ACuLOde4-1GlpxQsf9g2fkKw9sh_a_6-nExqmY4OVsyK023z3fQTzHM0ffZMqQNwglhL7fhCmq7Mb9YaE0fdVO2qTokOIrMEMG3dJ6P8lSBpWEMAtdlywYbVgAxWUhyimcdvjBu60P20Ad6HaFEqrUe2TcLog73zkkkB0MsKyNqq3m8Sm6l2eWMoHKK45R8CgLNLoyBJ549vPHgQvsXFS-EzzvhCClm_CdjCVO7G3obQZ8zrZz5yRd_K-c8AG41N_-_VMHrVsanff_Sua9KdeeDlpLZrGQlGdxAHqpqouOd9vDh5XV3egc9WEENRu7mrBJQiWflEey6AybGpUboybGrMvlceQWpeZ_JfOdqJ6gMMuQ/p.jpeg",
  "https://uc1d7a0bfb3d8c023dfc76174e09.previews.dropboxusercontent.com/p/thumb/ACuaCig6YSI83mZAZRKPZ8uRxXBwgz_4iOaax0TiBy0qbsE0E9fqhCJB495kiWQgql3feMaSLNLPVVg-iVCuuNUrpoGoJEZ73aNq-_7fWWBkhR71BDQxLZl2v5y7goVzQRhikPfLG0NAXkQVXhJCLe92oelHZZlkj6dow3yuT_2IMmW3T4eMwzkSmN04BbqKia3XbAAk534Lf1Sf6VzsYrFxWy8vlYI2drXOay5Wdwel_ZPPgexNwug_J3SBVSIbIowDSmojJPhufzkVF0sICLBHRuLSTdnW0XC0TUABFfhQeo4at_b8MzEeRUBC5mG81-OmXgTh5AX315Ixv71CLWZa0j_Pq4qry1Qph9pQTwxHGA/p.jpeg",
  "https://uc65116af743bad96100f1efdf37.previews.dropboxusercontent.com/p/thumb/ACtrI_568feHBQ6g4kxH70JS8nxx4fs_UkxfLmQVMCEffYFs5lPltBQTrbqpsde7Io481KKFOmE4P9nJI9Y39CKBkprGgZNwDkU-bcaPBRZD_42NBVvaGFgdiGg5JHq5yhAaOkpwPA0q0_E_VdpbgtP6QVlbuvn3-GxPBDXeqKZzZTLl06NvGZEFGjT_qryLzgC8UHqJz5bEHoCLTaILmvkwSFrkdYP0QBCsXxAvmofYczE4NBuNZ-IkWgFvNABb-RWdL5Wb_LAMbKk-bWe5etjsgouU_Zb7ucB_e5GfQbuwbNv2PdXy0w2tsEAF9MrtqlaBEnLILEEKwP7CIOsfdtmPJ9E4a11FRiNnoiuBzWCxy0Ff5b9YsAOIaoHWkIO5whos0rouen9mGbX3PuycGFiGkdyJ_COfsKa96fXEfX7jPw/p.jpeg",
  "https://uc933ca270150a5ece2fd41e7fc9.previews.dropboxusercontent.com/p/thumb/ACt3y7T4cJbuQ4x3YrKfB8GA__9WVLqABskf3BVrchM-dDHORnl81BtnCcCcAmRGUSEoMAiW-Vgc8K_WqVw22qbh7jZAxe9f5ww_0MAJcGeLFJnN0NQbt-5zUtMmvsz1AIlu6ceXYPVXXS_1nVoYeNYIr5NNRon9l4TTs0oJW80RDiEfWzx5lkgRldrbYeoRa2daYeH7l4b-Wm6u2EdvwsrFIdD-oLMypNMM3Cw-wav5CfHPF-NF8psC4HXeOlNzn7BCoaZzer5IQ14mRCxkRR9iYo76mMSsamML95ncjccL2BgXucU069c-tT4dVOGLtqf3Siyk0CEEaw5R9tJTVXeZRXJtfTLohdz-rIQT1wQHCEG_ODoP9eRt36kk3V3C2wAcpgxkr17lbtgjSUlCs73y2loEykV1TtFk8vmsmRlbAw/p.jpeg",
  "https://ucedc23676728ceec2576183f2f2.previews.dropboxusercontent.com/p/thumb/ACtFmBcExNXQvuXbHy57sKQ2E1yMpCRZwm4P37Pb--Z6Qs9E13yTAjnhmassEqZRqm4eH5J60owjEkf76uaa6_fIuBBI8QoanEqZ43GBJIIY5dHewnWf2W4KekFYT-nH-ezwdItTq6y7ceXfzCsgn2_KFmRnTJyCpFCUzQA1Kq1xbm-e1AEcmLsTWeoHpID46s8r3VIoxTjUGe7KOGxXqWa-S5g9SiEqdqq-ZK2zeWiFxvqWockF3y4wkpugNUNrBLc6mOdkwWkjb8m2m3UljuArl1nLMXvxsmfaHtQ-E2O9kcFFBSEBZnwvnJ3T5RQt626jjkEAePWqFfdV_wtj51kMv2vVWSy3nuwieuoDgaq8Ow/p.png",
  "https://uc968bcdee40ea9c6142fbfd04b3.previews.dropboxusercontent.com/p/thumb/ACtPU3QVimheLQyy5tXAbhiGBMYyJqrqhfepsCsga7aH3zDETJoUpcTFw-6WbIR6EcF83icdYcczjdxzDMdsozhXfZPuhvz7_Km2AKTGmdaBl5tMmFm6UVCrC5jjRz3OktdQgD4F8PVmsP3AOXboaoTXr8ZQ8uiQ7e6ubdAYLIXdekpnsIY7ZtHv1EVqwxs0ZRTJmO8Mbj1yHWOYN4RdlP70ZX3XpGXjPD3zHT7YkaCBP1Fmwggzz4I9J133Re95h6sXlHF7GVWn1ClijUqPzUUtgGWX55fa41-91pa3aB49JMtNwdYPsebzUw6HEYZstqcOIuuJjIVqW-oDroL-B66Zq9qv-yA5wVqorqWrszgZFw/p.png",
  "https://ucfa4017d41a2badda0f7a0402b6.previews.dropboxusercontent.com/p/thumb/ACtpndF1oibgFv-wruA6-a9EMRijMHwJ_JxpjzlkPsTjgHP_ca9KdRpN7R2pnmhrIl8NiaxCzSU23KVqWEsXwqxYFr2iYuH--TbEWVMciUZQ1zSPOLojZs1YHB3IbdPLHc_9sUY-TaGKO5K1M8cyT-GYsL0zxqd9dJnhNpH3FKkKSMle7TDy54lHeXCnP-JsMicUtOHu0zDtK7IDtAtQVjDEkAMCjCRxkWXvSD5H17St_BQGHCBzL9XkeMR-UcBDgjJp8vXcBffC2QH-5VXUXKP4Qq5vFwWdXgzQTUyqfXKgWOMahw5SgoBH4iQkglxRSq4Mp1VqeUmZg6NaSwRwH3v8b2CCebPGJr5FrsJhkW-CEQ/p.png",
  "https://ucfe2749e49822b8654ecc638344.previews.dropboxusercontent.com/p/thumb/ACsXCMz6q7xUF5l01IYXIGIw415WFWTBDbgL5kz8CGlN4ssNThhlt_Sd7YxA8BjnrCU2mQ_vY8F9Xxtxw3PGpHuNipbmQtfv6ZpXwxpmMBOUoQLt3ag_arlNcyHjc6hzOdWv-thWMI7_1jlz_yK8VKfKQDdNuvvX7DeBRZcqP-36_MjU-tzKog_ybQ-PIpF2E8dRy-L93MUS3W642igZEQa_oRWQL_3Ma0uHaB04hg2aDWAlI1uCAr5_nofEetLWdLcUgbtWL2Tz13cDv22a8fKmxxd7G0_wiwLVlbBh64FZSqBidsAMQCctZ4I4-iFF4Cqlmzq2FqXlDJdwfG_HA--dZZj_WBc4LXl4umxfsiqPnZPO3ED4RO6pX8pX-J0cAI9TQ0UrOU6qCu4jifoqr3_xfwxByVf6qRgdgfCad0B2fA/p.png",
];
function ScreenHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-10 mx-20">
      <About />
      <div className="flex flex-rox justify-center gap-20 my-10 animate-fade animate-duration-1000 animate-delay-2000">
        <div className="w-96">
          <Carrossel autoSlide={true} autoSlideInterval={5000}>
            {slides.map((s, i) => (
              <img key={i} src={s} className="object-cover rounded-lg" />
            ))}
          </Carrossel>
        </div>
        <div>
          <p className="w-[500px] text-[20px]">
            <strong className="text-web-red">Unitermi</strong> oferece uma linha
            completa de produtos térmicos e utilitários, combinando inovação,
            qualidade e design sofisticado, para que você tenha praticidade,
            durabilidade e estilo em cada momento do seu dia — seja mantendo
            suas bebidas na temperatura ideal, conservando alimentos ou
            garantindo conforto e funcionalidade em qualquer situação.
          </p>
          <img src={logo} alt="logo" className="w-96 mt-14" />
        </div>
      </div>
      <button
        onClick={() => navigate("/produtos")}
        className="flex flex-row items-center gap-5 cursor-pointer text-web-red my-32 py-5 px-36 rounded-2xl shadow-[2px_2px_7px_-2px_#ff0000] hover:bg-web-pink hover:shadow-[2px_2px_7px_-2px_#000] transition-all duration-700 animate-fade-up animate-once animate-duration-1000 animate-delay-1000
"
      >
        <IoBagHandle className="text-5xl" />
        <p className="flex flex-col items-start gap-0 text-2xl">
          Conheça nossos <strong className="text-3xl">Produtos</strong>
        </p>
      </button>
      <WhoWeAre />
    </div>
  );
}

export default ScreenHome;
