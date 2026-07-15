import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://codelens-ai-server.onrender.com/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const randomPassword = Math.random().toString(36).slice(-12);
                const hashedPassword = await bcrypt.hash(randomPassword, 10);
                if (!email) {
                    return done(new Error("Google account has no email"), null);
                }

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        password: hashedPassword,
                        provider: "google",
                        avatar: {
                            public_id: "",
                            url: profile.photos?.[0]?.value || "",
                        },
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

export default passport;