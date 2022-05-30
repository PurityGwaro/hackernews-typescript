//defining the link type using the objectType Nexus library
import { extendType, objectType, nonNull, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
//objectType is used to create a new type in the gql schema


//code for link type
export const Link = objectType({
    name: "Link",//name of the type
    definition(t) {//addition of different fields for the type
        t.nonNull.int("id");//field id of type Int
        t.nonNull.string("description");//field description of type string
        t.nonNull.string("url");//field url of type string
    },
});


//code for field feed of type Link, returns an object of links
export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed",{
            type: "Link",
            resolve(parents, args, context, info){
                return context.prisma.link.findMany();
            },
        });
    },
});


export const LinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const newLink = context.prisma.link.create({
                    data: {
                        description:args.description,
                        url:args.url,
                    }
                })
                return newLink;
            },
        });
    },
});

