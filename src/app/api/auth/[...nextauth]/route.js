// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import GitHubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt"

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const user = await getUserFromDB(credentials.email)
//         if (!user) return null

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         )

//         if (!isValid) return null
//         return user
//       },
//     }),
//   ],
// })

// export { handler as GET, handler as POST }














// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import GitHubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt"
// import dbConnect from "../../lib/mongodb"

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null

//         const user = await dbConnect(credentials.email)
//         if (!user) return null

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         )

//         if (!isValid) return null

//         return {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/", // optional (your modal handles this)
//   },

//   secret: process.env.AUTH_SECRET,
// })

// export { handler as GET, handler as POST }
