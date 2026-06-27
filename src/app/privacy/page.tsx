
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8 -ml-4 rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>
            <div className="bg-card p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg">
              <article>
                <header className="mb-8 text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-4 leading-tight">
                    Privacy Policy
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Your privacy is important to us.
                  </p>
                </header>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                  <Image
                    src="/Privacy.png"
                    alt="Privacy Policy"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-base sm:prose-lg max-w-none mx-auto text-foreground/90">
                    <p>
                        This Privacy Policy describes how TechPolarity ("we," "us," or "our") collects, uses, and discloses your information when you visit and use our website, located at www.techpolarity.com (the "TechPolarity").  We are committed to protecting your privacy and ensuring you have a positive experience on our Website. Please read this Privacy Policy carefully to understand our practices regarding your information and how we will treat it. By accessing or using our Website, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Website.
                    </p>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">1. Information We Collect</h3>
                    <p>We collect various types of information from and about users of our Website, including:</p>

                    <h4>A. Personal Information</h4>
                    <p>This is information that can be used to identify you directly or indirectly. We may collect personal information when you voluntarily provide it to us, such as when you:</p>
                    <ul>
                        <li>Create an account: (e.g., name, email address, password).</li>
                        <li>Subscribe to our newsletter: (e.g., email address).</li>
                        <li>Contact us through forms or email: (e.g., name, email address, message content).</li>
                        <li>Participate in surveys or contests: (e.g., demographic information, contact details).</li>
                    </ul>

                    <h4>B. Usage Data</h4>
                    <p>Usage Data is collected automatically when using the Service. Usage Data may include information such as your device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. When you access the Service by or through a mobile device, We may collect certain information automatically, including, but not to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data. We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device.</p>
                    <p><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies (like web beacons and pixels) to track the activity on our Website and hold certain information.</p>
                    <ul>
                        <li><strong>Cookies:</strong> Small data files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.</li>
                        <li><strong>Web Beacons/Pixels:</strong> Small graphic images embedded in web pages or emails that allow us to monitor user activity and effectiveness of campaigns.</li>
                    </ul>
                    <p>Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when you go offline, while Session Cookies are deleted as soon as you close your web browser.</p>
                    <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                    <h5>Necessary / Essential Cookies</h5>
                    <p>Type: Session Cookies<br/>Administered by: Us<br/>Purpose: These Cookies are essential to provide you with services available through the Website and to enable you to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that you have asked for cannot be provided, and we only use these Cookies to provide you with those services.</p>
                    <h5>Cookies Policy / Notice Acceptance Cookies</h5>
                    <p>Type: Persistent Cookies<br/>Administered by: Us<br/>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                    <h5>Functionality Cookies</h5>
                    <p>Type: Persistent Cookies<br/>Administered by: Us<br/>Purpose: These Cookies allow us to remember choices you make when you use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you use the Website.</p>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">2. How We Use Your Information</h3>
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul>
                        <li>To provide and maintain our Website: Including monitoring the usage of our Website.</li>
                        <li>To improve our Website: We use feedback and usage data to understand user needs and improve the content, features, and functionality of our Website.</li>
                        <li>To personalise your experience: To deliver content and product offerings relevant to your interests.</li>
                        <li>To communicate with you: To respond to your inquiries, send you newsletters, updates, marketing and promotional materials, and other information that may be of interest to you. You can opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</li>
                        <li>To send periodic emails: We may use your email address to send you information and updates pertaining to your inquiries or orders, in addition to receiving occasional company news, updates, related product or service information, etc.</li>
                        <li>For security and fraud prevention: To detect, prevent, and address technical issues, security incidents, or fraudulent activities.</li>
                        <li>For analytics and research: To understand how users interact with our Website, analyse trends, and gather demographic information about our user base.</li>
                        <li>To comply with legal obligations: To meet any applicable laws, regulations, legal processes, or governmental requests.</li>
                    </ul>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">3. How We Share Your Information</h3>
                    <p>The Company may use Personal Data for the following purposes:</p>
                    <ul>
                        <li><strong>To provide and maintain our Service</strong>, including monitoring the usage of our Service.</li>
                        <li><strong>To manage Your Account:</strong> to manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the Service that are available to you as a registered user.</li>
                        <li><strong>For the performance of a contract:</strong> The development, compliance and undertaking of the purchase contract for the products, items or services you have purchased or of any other contract with Us through the Service.</li>
                        <li><strong>To contact you:</strong> To contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                        <li><strong>To provide you with news</strong>, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about, unless you have opted not to receive such information.</li>
                        <li><strong>To manage your requests:</strong> To attend and manage your requests to us.</li>
                        <li><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                        <li><strong>For other purposes:</strong> We may use your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                    </ul>
                    <p>We may share your personal information in the following situations:</p>
                    <ul>
                        <li><strong>With Service Providers:</strong> We may share your personal information with Service Providers to monitor and analyse the use of our Service, and to contact you.</li>
                        <li><strong>For business transfers:</strong> We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                        <li><strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honour this Privacy Policy. Affiliates include our parent company and any other subsidiaries, joint venture partners or other companies that we control or that are under common control with Us.</li>
                        <li><strong>With business partners:</strong> We may share your information with our business partners to offer you certain products, services or promotions.</li>
                        <li><strong>With other users:</strong> When you share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
                        <li><strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.</li>
                    </ul>
                    
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">4. Data Security</h3>
                    <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These measures include:</p>
                    <ul>
                        <li><strong>Encryption:</strong> We use SSL/TLS encryption to protect sensitive information transmitted online.</li>
                        <li><strong>Access Controls:</strong> Access to your personal information is restricted to authorised personnel who need to know that information to perform their job functions.</li>
                        <li><strong>Regular Security Audits:</strong> We regularly review our security practices to ensure they are up-to-date and effective.</li>
                    </ul>
                    <p><strong>Note:</strong> However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                    
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">5. Your Data Protection Rights</h3>
                    <p>You may have certain rights regarding your personal information. These may include:</p>
                    <ul>
                        <li><strong>Right to Access:</strong> The right to request copies of your personal data.</li>
                        <li><strong>Right to Rectification:</strong> The right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                        <li><strong>Right to Erase ("Right to Be Forgotten"):</strong> The right to request that we erase your personal data under certain conditions.</li>
                        <li><strong>Right to Restrict Processing:</strong> The right to request that we restrict the processing of your personal data under certain conditions.</li>
                        <li><strong>Right to Object to Processing:</strong> The right to object to our processing of your personal data under certain conditions.</li>
                        <li><strong>Right to Data Portability:</strong> The right to request that we transfer the data that we have collected to another organisation, or directly to you, under certain conditions.</li>
                        <li><strong>Right to Withdraw Consent:</strong> Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us using the contact details provided in the "Contact Us" section below. We will respond to your request within a reasonable timeframe.</p>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">6. Third-Party Websites and Services</h3>
                    <p>Our Website may contain links to third-party websites or services that are not owned or controlled by TechPolarity. This Privacy Policy applies only to our Website. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to review the privacy policies of any third-party websites or services that you visit.</p>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">7. Children's Privacy</h3>
                    <p>Our Website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from a child under the age of 13 without verification of parental consent, we will take steps to remove that information from our servers.</p>

                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">8. Changes to This Privacy Policy</h3>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                    
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">9. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, you can contact us:</p>
                    <ul>
                        <li>By email: <a href="mailto:techpolarity@gmail.com">techpolarity@gmail.com</a></li>
                        <li>By visiting this page on our website: <a href="https://www.techpolarity.com">www.techpolarity.com</a></li>
                    </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
