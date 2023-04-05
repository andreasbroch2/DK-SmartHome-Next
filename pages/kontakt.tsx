import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import Header from '../components/header';
import { getSinglePage, getNavMenu } from '../lib/api';
import imgConverter from '../lib/imgConverter';
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe"

const Page = ({ data, preview = false, menuItems, footerMenuItems }) => {
    const router = useRouter();
    const url = "//dksmarthome.us21.list-manage.com/subscribe/post?u=cf54bb26d48dbc75d737c6030&amp;id=fb6a480747&amp;f_id=00dac2e1f0";
    const CustomForm = ({ status, message, onValidated }) => {
        let email, fname, lname, phone, adresse;
        const submit = () =>
            email &&
            fname &&
            lname &&
            phone &&
            adresse &&
            email.value.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email.value,
                FNAME: fname.value,
                LNAME: lname.value,
                PHONE: phone.value,
                ADRESSE: adresse.value,
            });

        return (
            <div className='form'>
                {status === "sending" && <div style={{ color: "blue" }}>Sender...</div>}
                {status === "error" && (
                    <div
                        style={{ color: "red" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                {status === "success" && (
                    <div
                        style={{ color: "green" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        ref={node => (fname = node)}
                        type="text"
                        placeholder="Fornavn"
                    />
                    <input
                        ref={node => (lname = node)}
                        type="text"
                        placeholder="Efternavn"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <input
                    ref={node => (email = node)}
                    type="email"
                    placeholder="Din e-mail"
                />
                                <input
                    ref={node => (phone = node)}
                    type="number"
                    placeholder="Dit telefonnummer"
                />
                </div>
                <input
                    ref={node => (adresse = node)}
                    type="text"
                    placeholder="Adresse"
                />
                <div className='text-center'>
                    <button className='btn' onClick={submit}>
                        Send
                    </button>
                </div>
            </div>
        );
    };

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Indlæser...</div>;
    }
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        comments: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // handle form submission logic here
    };
    return (
        <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
            <Head>
                <title>{data?.seo.title}</title>
            </Head>
            <Container>
                <Header menuItems={menuItems} />
                <div className='entry-content'>{imgConverter(data.content)}</div>
                <div className="container mx-auto my-12 flex flex-col md:flex-row gap-8">
                    <div className="basis-1/2">
                        <h2 className="mb-4">Få et tilbud</h2>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                    status={status}
                                    message={message}
                                    onValidated={formData => subscribe(formData)}
                                />
                            )}
                        />
                    </div>
                    <div className="basis-1/2">
                        <h2 className="mb-4">Send en besked</h2>
                        <form action="https://dksmarthome.dk/wp-admin/admin-ajax.php" id="contactForm" method="post" className="form" onSubmit={handleSubmit}>
                            <ul>
                                <li>
                                    <input type="text" placeholder="Name" name="contactName" id="contactName" value={formData.firstName} onChange={handleInputChange} />
                                </li>
                                <li>
                                    <input type="text" placeholder="Email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                                </li>
                                <li>
                                    <textarea name="comments" placeholder="Write your message here..." id="commentsText" value={formData.comments} onChange={handleInputChange}></textarea>
                                </li>
                                <li className="text-center">
                                    <button type="submit" id="submitButton" className="btn">
                                        Send besked
                                    </button>
                                </li>
                            </ul>
                            <input type="hidden" name="submitted" id="submitted" value="true" />
                        </form>
                    </div>
                </div>
            </Container>
        </Layout >
    );
};

export default Page;

export async function getStaticProps() {
    const data = await getSinglePage('/kontakt');
    const menuItems = await getNavMenu('PRIMARY');
    const footerMenuItems = await getNavMenu('FOOTER');
    return {
        props: {
            data: data || {},
            menuItems: menuItems,
            footerMenuItems: footerMenuItems,
        },
        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };

}
