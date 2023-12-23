const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required value'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Drama','Action','Crime','Sci-Fi','Adventure','Romance','Animation','Biography','Fantasy']),
        {
            required_error: 'Movie genre is a required value',
            invalid_type_error: 'Movie genre must be an array of enum generes'
        }
    ),
    rate: z.number().min(0).max(10).default(5)
})

function validateMovie (input) {
    return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
    return movieSchema.partial().safeParse(input)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}