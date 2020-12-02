import argparse
import json
import numpy as np
import json #used to dump data to JSON file

from compute_scores import pearson_score
from collaborative_filtering import find_similar_users

def build_arg_parser():
    parser = argparse.ArgumentParser(description='Find the book recommendations for a given user')
    parser.add_argument('--user', dest='user', required=True,
            help='Input user')
    return parser
 
# Get book recommendations for the input user
def get_recommendations(dataset, input_user):
    if input_user not in dataset:
        raise TypeError('Cannot find ' + input_user + ' in the dataset')

    overall_scores = {}
    similarity_scores = {}

    for user in [x for x in dataset if x != input_user]:
        similarity_score = pearson_score(dataset, input_user, user)

        if similarity_score <= 0:
            continue
        
        filtered_list = [x for x in dataset[user] if x not in \
                dataset[input_user] or dataset[input_user][x] == 0]

        for item in filtered_list: 
            overall_scores.update({item: dataset[user][item] * similarity_score})
            similarity_scores.update({item: similarity_score})

    if len(overall_scores) == 0:
        return ['No recommendations possible']

    # Generate book ranks by normalization 
    book_scores = np.array([[score/similarity_scores[item], item] 
            for item, score in overall_scores.items()])

    # Sort in decreasing order 
    book_scores = book_scores[np.argsort(book_scores[:, 0])[::-1]]

    # Extract the book recommendations
    book_recommendations = [book for _, book in book_scores]

    return book_recommendations
 
if __name__=='__main__':
    args = build_arg_parser().parse_args()
    user = args.user

    ratings_file = 'bookRatings.json'

    with open(ratings_file, 'r') as f:
        data = json.loads(f.read())
        
#writing to terminal
    books = get_recommendations(data, user)
    print("\nBook recommendations for " + user + ":")
    books = get_recommendations(data, user) 
    for i, book in enumerate(books):
        print(str(i+1) + '. ' + book)
    
    #Writing to JSON File
    #Source: https://www.geeksforgeeks.org/reading-and-writing-json-to-a-file-in-python/
    with open('outData.json', 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=4)
        print("\nRecommendations written to 'outData.json'.")


